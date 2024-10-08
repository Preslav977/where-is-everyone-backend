const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameModel = new Schema({
  image_link: { type: String, required: true },
  game_name: { type: String, required: true },
  leaderboard: { type: Schema.Types.ObjectId, ref: "LeaderBoard" },
});

module.exports = mongoose.model("Game", GameModel);
