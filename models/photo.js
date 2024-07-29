const mongoose = require("mongoose");

const { Schema } = mongoose;

const PhotoModel = new Schema({
  image_link: { type: String, required: true },
});

module.exports = mongoose.model("Photo", PhotoModel);
