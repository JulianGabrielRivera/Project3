// models/User.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const placeSchema = new Schema({
  name: String,
  img: String,
  description: String,
  rating: Number,
  comments: [String],
});

module.exports = model('Place', placeSchema);
