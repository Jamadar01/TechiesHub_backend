import express from 'express';
import { 
  createPost, 
  getPosts,
  likePost,
  unlikePost,
  commentPost,
  getUserPosts 
} from '../services/postServices.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('image'), createPost);
router.get('/', getPosts);
router.post('/like', likePost);
router.post('/unlike', unlikePost);
router.post('/comment', commentPost);
router.get('/user/:userId', getUserPosts);

export default router;
