// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  emailToken: { type: String },
  isVerified: { type: Boolean },
  totalPlacesLiked: { type: Number },
  myComments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  role: {
    type: String,
    enum: ["GUEST", "ADMIN"],
    default: "GUEST",
  },
  // so idofplace can either be number or objectid
  // onclick we change boolean value
  places: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  // cards: [{ type: Schema.Types.ObjectId, ref: "PaymentInfo" }],
  // placesILiked: { type: Number, default: 0 },
});

module.exports = model("User", userSchema);
