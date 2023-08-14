import { Router } from 'express';
import { requireAuth } from './middleware/requireAuth';
import {
    authenticateUser,
    createUser,
    follow,
    getSelfData,
    unFollow,
} from './modules/user/user.controllers';

const router = Router();

// user routes
router.post('/create-user', createUser);
router.post('/authenticate', authenticateUser);
router.post('/follow/:id', requireAuth, follow);
router.post('/unfollow/:id', requireAuth, unFollow);
router.get('/user', requireAuth, getSelfData);

export default router;
