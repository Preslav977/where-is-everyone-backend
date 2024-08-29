const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionModel = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  characters: [
    {
      character_name: String,
      character_image: String,
      coordinateX: Number,
      coordinateY: Number,
      marked: Boolean,
    },
  ],
  startTime: { type: Date },
  endTime: { type: Date },
});

module.exports = mongoose.model("Session", SessionModel);
