const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionModel = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  foundCharacters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
  startTime: { type: Date },
  endTime: { type: Date },
});

module.exports = mongoose.model("Session", SessionModel);
