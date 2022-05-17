// models/User.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  myComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  role: {
    type: String,
    enum: ['GUEST', 'ADMIN'],
    default: 'GUEST',
  },
});

module.exports = model('User', userSchema);
