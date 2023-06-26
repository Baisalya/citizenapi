
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
  });
  
  const photoSchema = new mongoose.Schema({
    path: {
      type: String,
      required: true,
    },
  });
  export const Photo = mongoose.model('Photo', photoSchema);
  export const Location = mongoose.model('Location', locationSchema);