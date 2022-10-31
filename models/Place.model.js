// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const placeSchema = new Schema({
  name: String,
  url: String,
  description: String,
  rating: Number,
  continent: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
  price: Number,
});

module.exports = model("Place", placeSchema);
