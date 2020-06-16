import { Request, Response } from 'express';
import { RequestUser } from '../interfaces/request';
import { IUser } from '../interfaces/user';
import { User } from '../models/User';
import { AsyncHandler } from '../middleware/async';
import { RequestAdvancedResults } from '../interfaces/request';
import { ResponseAdvancedResults } from '../interfaces/response';
import { ErrorResponse } from '../utils/errorResponse';

// @desc      Get users
// @route     GET /api/v1/users
// @access    Private
export const getUsers = AsyncHandler(
  async (
    req: RequestAdvancedResults,
    res: ResponseAdvancedResults<IUser>,
    next
  ) => {
    res.status(200).json(res.advancedResults);
  }
);

// @desc      Get user
// @route     GET /api/v1/users/:id
// @access    Private
export const getUser = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: user });
  }
);

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private
export const createUser = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const user = await User.create(req.body);

    res.status(200).json({ success: true, data: user });
  }
);

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private
export const updateUser = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  }
);

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private
export const deleteUser = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    await user.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
