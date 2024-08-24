const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionModel = new Schema({
  game: { type: mongoose.SchemaTypes.ObjectId, ref: "Game" },
  startTime: { type: Date },
  endTime: { type: Date },
});

module.exports = mongoose.model("Session", SessionModel);
