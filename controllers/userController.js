import { followUser, unfollowUser } from '../services/userServices.js';

router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);
router.get('/allUsers', getAllUsers);
