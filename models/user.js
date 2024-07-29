const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, minLength: 1, maxLength: 30, required: true },
  time: { type: Date, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.module("User", UserSchema);
