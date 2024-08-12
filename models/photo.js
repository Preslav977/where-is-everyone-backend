const mongoose = require("mongoose");

const { Schema } = mongoose;

const PhotoModel = new Schema({
  image_link: { type: String, required: true },
  characters: [{ type: Schema.ObjectId, ref: "Character" }],
});

module.exports = mongoose.model("Photo", PhotoModel);
