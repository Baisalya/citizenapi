import jwt from 'jsonwebtoken';
import { createError } from './error.js';
import { User, Admin } from '../models/user.js';

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(createError(401, 'User not found'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(createError(403, 'Token is not valid!'));
  }
};

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return next(createError(401, 'Admin not found'));
    }
    req.admin = admin;
    next();
  } catch (error) {
    next(createError(403, 'Token is not valid!'));
  }
};
