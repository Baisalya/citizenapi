//const Location = require('../models/Location');
//const User = require('../models/User');
import { User } from '../models/user.js';

import { Location } from '../models/location.js';

// Create a new location for a user
export const createLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    const location = new Location({ longitude, latitude });
    await location.save();

    const userId = req.params.userId; // Assuming the userId is provided in the request parameters
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.locations.push(location);
    await user.save();

    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create location' });
  }
};
//
export const getUserLocations = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the userId is provided in the request parameters
    const user = await User.findById(userId).populate('locations');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const locations = user.locations.map(location => ({
      ...location._doc,
      createdAt: location.createdAt.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })    }));

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user locations' });
  }
};


// Get all locations for a user


// Delete a location for a user
export const deleteLocation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const locationIndex = user.locations.findIndex(
      (locationId) => locationId.toString() === req.params.locationId
    );

    if (locationIndex === -1) {
      return res.status(404).json({ error: 'Location not found' });
    }

    user.locations.splice(locationIndex, 1);
    await user.save();

    await Location.findByIdAndRemove(req.params.locationId);

    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete location' });
  }
};


