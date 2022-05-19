// models/User.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const placeSchema = new Schema({
  name: String,
  img: String,
  description: String,
  rating: Number,
  continent: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = model('Place', placeSchema);
