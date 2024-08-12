const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionModel = new Schema({
  photo: { type: mongoose.SchemaTypes.ObjectId, ref: "Photo" },
  startTime: { type: Date },
  endTime: { type: Date },
});

module.exports = mongoose.model("Session", SessionModel);
