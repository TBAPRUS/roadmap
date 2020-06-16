import * as express from 'express';

import {
  getRoadmaps,
  getRoadmap,
  updateRoadmap,
  createRoadmap,
  deleteRoadmap,
  subscribeRoadmap,
} from '../controllers/roadmap';

import { user, authorize } from '../middleware/auth';

import { Roadmap } from '../models/Roadmap';
import { IRoadmap } from '../interfaces/roadmap';

import { advancedResults } from '../middleware/advancedResults';

import section from './section';

const router: express.Router = express.Router({ mergeParams: true });

router.use('/:roadmapId/sections', section);

router
  .route('/')
  .get(
    user(false),
    advancedResults<IRoadmap>(
      Roadmap,
      undefined,
      ['title', 'description'],
      'private'
    ),
    getRoadmaps
  )
  .post(user(true), createRoadmap);

router.route('/:slug').get(user(false), getRoadmap);

router
  .route('/:id')
  .put(user(true), updateRoadmap)
  .delete(user(true), deleteRoadmap);

router.get('/:id/subscribe', user(true), subscribeRoadmap);

export default router;
