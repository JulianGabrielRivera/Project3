const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  time: String,
});

module.exports = model("Chat", chatSchema);
