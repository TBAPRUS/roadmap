import * as express from 'express';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

import { user, authorize } from '../middleware/auth';

import { User } from '../models/User';
import { IUser } from '../interfaces/user';

import { advancedResults } from '../middleware/advancedResults';

import roadmap from './roadmap';
import auth from './auth';

const router: express.Router = express.Router();

router.use('/:userId/roadmaps', roadmap);
router.use('/:userId/auth', auth);

router.use(user(true));
router.use(authorize('admin'));

router
  .route('/')
  .get(
    advancedResults<IUser>(User, undefined, ['email', 'name']),
    getUsers
  )
  .post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
