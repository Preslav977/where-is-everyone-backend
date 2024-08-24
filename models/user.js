const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, minLength: 1, maxLength: 30, required: true },
  score: { type: Number, required: true },
  game: { type: Schema.ObjectId, ref: "Game" },
  date: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
