import * as express from 'express';

import roadmap from './roadmap';
import auth from './auth';
import users from './users';
import frontend from './frontend';

const router: express.Router = express.Router({ mergeParams: true });

router.use('/api/v1/roadmaps', roadmap);
router.use('/api/v1/auth', auth);
router.use('/api/v1/users', users);
router.use(frontend);

export { router };
