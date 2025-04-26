import User from '../mmongooseModels/User.js';

export const followUser = async (req, res) => {
    const { currentUserId, targetUserId } = req.body;
  
    try {
      const currentUser = await User.findById(currentUserId);
      const targetUser = await User.findById(targetUserId);
  
      if (!currentUser.following.includes(targetUserId)) {
        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUserId);
  
        await currentUser.save();
        await targetUser.save();
      }
  
      res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const unfollowUser = async (req, res) => {
    const { currentUserId, targetUserId } = req.body;
  
    try {
      const currentUser = await User.findById(currentUserId);
      const targetUser = await User.findById(targetUserId);
  
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );
  
      await currentUser.save();
      await targetUser.save();
  
      res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Hide password
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  