import * as mongoose from 'mongoose';

export interface ISection {
  title: string;
  text: string;
  owner: mongoose.Types.ObjectId;
  roadmap: mongoose.Types.ObjectId;
}

export interface ISectionDocument extends ISection, mongoose.Document {}

export interface ISectionModel extends mongoose.Model<ISectionDocument> {}
