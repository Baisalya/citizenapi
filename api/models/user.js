// Import required packages
//const mongoose = require('mongoose');
import mongoose from 'mongoose';
import { Location } from './location.js';
import { Photo } from './location.js';
// Define the schema for regular users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for admin users
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  }],
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the user model
//const User = mongoose.model('User', userSchema);
export const User = mongoose.model('User', userSchema);
export const Admin = mongoose.model('Admin', adminSchema);
// Define the admin model
// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = {
//   User,
//   Admin,
// };
//export default User;