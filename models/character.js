const mongoose = require("mongoose");

const { Schema } = mongoose;

const CharacterModel = new Schema({
  photo: { type: Schema.Types.ObjectId, ref: "Photo" },
  character_name: { type: String, required: true },
  character_image: { type: String, required: true },
  coordinateX: { type: Number, required: true },
  coordinateY: { type: Number, required: true },
  marked: { type: Boolean, required: true },
});

module.exports = mongoose.model("Character", CharacterModel);
