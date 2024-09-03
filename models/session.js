const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionModel = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  characters: [
    {
      character: { type: Schema.Types.ObjectId, ref: "Character" },
      marked: { type: Boolean, default: false },
    },
  ],
  startTime: { type: Date },
  endTime: { type: Date },
});

module.exports = mongoose.model("Session", SessionModel);
