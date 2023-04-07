const User = require('../models/user');
const fs = require('fs');

exports.getUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
  };

exports.updateUser = async (userId, updatedUserData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return updatedUser;
  };
  