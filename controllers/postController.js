const express = require('express');
const { createPost, getPosts,likePost, unlikePost, commentPost ,getUserPosts} = require('../services/postServices');

const router = express.Router();

router.post('/', upload.single('image'), createPost);
router.get('/', getPosts);
router.post('/like', likePost);
router.post('/unlike', unlikePost);
router.post('/comment', commentPost);
router.get('/user/:userId', getUserPosts);
module.exports = router;
