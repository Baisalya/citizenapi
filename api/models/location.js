
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const photoSchema = new mongoose.Schema({
    path: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  export const Photo = mongoose.model('Photo', photoSchema);
  export const Location = mongoose.model('Location', locationSchema);