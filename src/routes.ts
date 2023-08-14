import { Router } from 'express';
import { requireAuth } from './middleware/requireAuth';
import { createComment } from './modules/comment/comment.controllers';
import {
    createPost,
    deletePost,
    getAllPostByUser,
    getPostData,
    likePost,
    unlikePost,
} from './modules/post/post.controllers';
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

// post routes
router.post('/posts', requireAuth, createPost);
router.delete('/posts/:id', requireAuth, deletePost);
router.post('/like/:id', requireAuth, likePost);
router.post('/unlike/:id', requireAuth, unlikePost);
router.get('/posts/:id', getPostData);
router.get('/all_posts', requireAuth, getAllPostByUser);

// comment routes
router.post('/comment/:id', requireAuth, createComment);

export default router;
