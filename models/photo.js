const mongoose = require("mongoose");

const { Schema } = mongoose;

const PhotoModel = new Schema({
  image_link: { type: String },
});

module.exports = mongoose.model("Photo", PhotoModel);
