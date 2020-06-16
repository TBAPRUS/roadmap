import * as express from 'express';

import {
  verify,
  createSection,
  updateSection,
  deleteSection,
} from '../controllers/section';

import { user } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.use(user(true));

router.post('/', verify, createSection);
router.put('/:id', verify, updateSection);
router.delete('/:id', verify, deleteSection);

export default router;
