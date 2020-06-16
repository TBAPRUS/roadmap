import * as path from 'path';
import { imageSize } from 'image-size';
import { Response, Request } from 'express';
import { RequestUser } from '../interfaces/request';
import { IUser } from '../interfaces/user';
import { User } from '../models/User';
import { AsyncHandler } from '../middleware/async';
import { ErrorResponse } from '../utils/errorResponse';

// @desc      Register
// @route     POST /api/v1/auth/register
// @access    Public
export const register = AsyncHandler(
  async (req: Request, res: Response, next) => {
    const { name, password, email } = req.body;

    const user: IUser = await User.create({ name, password, email });

    sendTokenResponse(user, 200, res);
  }
);

// @desc      Login
// @route     POST /api/v1/auth/login
// @access    Public
export const login = AsyncHandler(async (req: Request, res: Response, next) => {
  const { password, email }: { password: string; email: string } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user: IUser = await User.findOne({ email: email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 201, res);
});

// @desc      Logout
// @route     GET /api/v1/auth/logout
// @access    Private
export const logout = (req: RequestUser, res: Response, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
};

// @desc      Get current user
// @route     GET /api/v1/auth/me
// @access    Private
export const me = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const user = await User.findById(req.user.id).select(
      '_id name email role image'
    );

    res.status(200).json({ success: true, data: user });
  }
);

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
export const updateDetails = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const fieldsToUpdate = {
      name: req.body.name,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    }).select('_id name email role image');

    res.status(200).json({ success: true, data: user });
  }
);

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isMatch = await user.matchPassword(req.body.currentPassword);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendTokenResponse(user, 200, res);
  }
);

// @desc      Update image of user
// @route     PUT /api/v1/auth/updateimage
// @route     PUT /api/v1/users/:userId/auth/updateimage
// @access    Private
export const updateImage = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    let user;

    if (req.params.userId && req.user.role === 'admin') {
      user = await User.findById(req.params.userId);
    } else {
      user = req.user;
    }

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
      );
    }

    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    let file = req.files.file;

    if (Array.isArray(file)) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    const { width, height } = imageSize(file.data);
    if (width != height || width > 500 || width < 250) {
      return next(
        new ErrorResponse(
          `Please upload an image whose width and length are equal, as well as not less than 250 pixels and not more than 500 pixels`,
          400
        )
      );
    }

    if (file.data.length > parseInt(process.env.MAX_FILE_UPLOAD)) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    file.name = `image_${user._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      if (Array.isArray(file)) {
        // TypeScript the best
        return next(new ErrorResponse(`Please upload an image file`, 400));
      }

      await User.findByIdAndUpdate(user.id, { image: file.name });

      res.status(200).json({ success: true, data: file.name });
    });
  }
);

const sendTokenResponse = (
  user: IUser,
  statusCode: number,
  res: Response
): void => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true });
};
