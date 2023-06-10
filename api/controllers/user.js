
const User = require('../models/user');

// Update a user
exports.updateUser = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
  
  // Get a user by ID
  exports.getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
  
  // Delete a user
  exports.deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      next(err);
    }
  };