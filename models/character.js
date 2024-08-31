const mongoose = require("mongoose");

const { Schema } = mongoose;

const CharacterModel = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  character_name: { type: String, required: true },
  character_image: { type: String, required: true },
  coordinateX: { type: Number, required: true },
  coordinateY: { type: Number, required: true },
  marked: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Character", CharacterModel);
