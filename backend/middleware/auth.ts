import { Response } from 'express';
import { RequestUser } from '../interfaces/request';
import * as jwt from 'jsonwebtoken';
import { AsyncHandler } from './async';
import { ErrorResponse } from '../utils/errorResponse';
import { User } from '../models/User';
import { IUserDocument } from '../interfaces/user';

export const user = (protect: boolean) =>
  AsyncHandler(async (req: RequestUser, res: Response, next) => {
    let token: string;

    if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token && protect) {
      return next(new ErrorResponse('Not authorize to access this route', 401));
    }

    if (!token) {
      return next();
    }

    try {
      const decoded: string | { id?: number } = await jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      if (typeof decoded == 'object') {
        req.user = (await User.findById(decoded.id)) as IUserDocument;
      }

      next();
    } catch (err) {
      if (protect) {
        return next(
          new ErrorResponse('Not authorize to access this route', 401)
        );
      }

      next();
    }
  });

export const authorize = (...roles: string[]) => (
  req: RequestUser,
  res: Response,
  next
) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `User role ${req.user.role} is not authorized to access this route`,
        403
      )
    );
  }
  next();
};
