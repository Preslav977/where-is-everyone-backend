const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, minLength: 1, maxLength: 30, required: true },
    score: { type: Date, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.module("User", UserSchema);
