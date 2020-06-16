import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { unlink } from 'fs';

import { ErrorResponse } from '../utils/errorResponse';

import { Roadmap } from './Roadmap';

import { IUser, IUserDocument, IUserModel } from '../interfaces/user';

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      minlength: 4,
      maxlength: 26,
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      emun: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/,
        'The password must contain from 6 to 24 characters, at least 1 number, 1 lowercase Latin letter and 1 uppercase Latin letter',
      ],
      select: false,
    },
    image: {
      type: String,
      default: 'noimg.jpg',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt: string = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre<IUserDocument>('remove', async function (next) {
  const id: string = this._id;

  const roadmaps = await Roadmap.find({ owner: id });
  roadmaps.forEach(async function (roadmap) {
    await roadmap.remove();
  });

  if (this.image === 'noimg.jpg') {
    return next();
  } else {
    unlink(`${process.env.FILE_UPLOAD_PATH}/${this.image}`, async function (
      err
    ) {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      next();
    });
  }
});
export const User: IUserModel = mongoose.model<IUserDocument>(
  'User',
  UserSchema
);
