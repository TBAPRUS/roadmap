import * as mongoose from 'mongoose';

import { Roadmap } from './Roadmap';

import {
  ISection,
  ISectionDocument,
  ISectionModel,
} from '../interfaces/section';

import { IRoadmapDocument } from '../interfaces/roadmap';

const SectionSchema: mongoose.Schema<ISection> = new mongoose.Schema<ISection>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title of section'],
      maxlength: 250,
    },
    text: {
      type: String,
      required: [true, 'Please add a text of section'],
      maxlength: 5000,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roadmap',
      required: true,
    },
  },
  { versionKey: false }
);

SectionSchema.pre<ISectionDocument>('remove', async function (next) {
  const roadmap: IRoadmapDocument = (await Roadmap.findById(
    this.roadmap
  )) as IRoadmapDocument;

  if (!roadmap) {
    next();
  }

  const sections = roadmap.sections.filter(
    (section) => section.toString() !== this._id.toString()
  );

  await Roadmap.findByIdAndUpdate(
    this.roadmap,
    { sections: sections },
    {
      new: true,
      runValidators: true,
    }
  );

  next();
});

export const Section: ISectionModel = mongoose.model<ISectionDocument>(
  'Section',
  SectionSchema
);
