import * as mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  image: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  createdAt: Date;
  getSignedJwtToken: () => string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  getResetPasswordToken: () => string;
}

export interface IUserDocument extends IUser, mongoose.Document {}

export interface IUserModel extends mongoose.Model<IUserDocument> {}
