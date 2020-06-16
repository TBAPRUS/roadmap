import * as mongoose from 'mongoose';

export interface IRoadmap {
  title: string;
  description: string;
  slug: string;
  boolean: boolean;
  owner: mongoose.Types.ObjectId;
  private: string;
  sections: mongoose.Types.ObjectId[];
  subscribers: mongoose.Types.ObjectId[];
}

export interface IRoadmapDocument extends mongoose.Document, IRoadmap {}

export interface IRoadmapModel extends mongoose.Model<IRoadmapDocument> {}
