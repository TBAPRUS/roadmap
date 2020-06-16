import * as mongoose from 'mongoose';
import slugify from 'slugify';

import { Section } from './Section';

import {
  IRoadmap,
  IRoadmapDocument,
  IRoadmapModel,
} from '../interfaces/roadmap';

const RoadmapSchema: mongoose.Schema<IRoadmap> = new mongoose.Schema<IRoadmap>(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      maxlength: [100, 'Title can not be more than 100 characters'],
      required: [true, 'Please add a title of roadmap'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description can not be more than 1000 characters'],
      required: [true, 'Please add a description of roadmap'],
    },
    slug: String,
    private: {
      type: String,
      emun: ['public', 'private'],
      default: 'private',
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { versionKey: false }
);

RoadmapSchema.pre<IRoadmapDocument>('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

RoadmapSchema.pre<IRoadmapDocument>('remove', async function (next) {
  const sections = await Section.find({ roadmap: this.id });

  sections.forEach(async (section) => {
    await section.remove();
  });

  next();
});

export const Roadmap: IRoadmapModel = mongoose.model<IRoadmapDocument>(
  'Roadmap',
  RoadmapSchema
);
