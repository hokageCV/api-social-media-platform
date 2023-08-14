import { Router } from 'express';
import { authenticateUser, follow, getSelfData, unFollow } from './modules/user/user.controllers';

const router = Router();

// user routes
router.post('/authenticate', authenticateUser);
router.post('/follow/:id', follow);
router.post('/unfollow/:id', unFollow);
router.get('/user', getSelfData);

export default router;
