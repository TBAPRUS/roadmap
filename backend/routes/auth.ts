import * as express from 'express';

import {
  register,
  login,
  logout,
  me,
  updateDetails,
  updatePassword,
  updateImage,
} from '../controllers/auth';

import { user } from '../middleware/auth';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/register', register);
router.post('/login', login);
router.get('/logout', user(true), logout);
router.get('/me', user(true), me);
router.put('/updatedetails', user(true), updateDetails);
router.put('/updatepassword', user(true), updatePassword);
router.put('/updateimage', user(true), updateImage);

export default router;
