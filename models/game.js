const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameModel = new Schema({
  image_link: { type: String, required: true },
  game_name: { type: String, required: true },
  characters: [{ type: Schema.ObjectId, ref: "Character" }],
  leaderboard: { type: Schema.ObjectId, ref: "LeaderBoard" },
});

module.exports = mongoose.model("Game", GameModel);
