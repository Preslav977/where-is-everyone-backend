const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionModel = new Schema(
  {
    startTime: { type: Date },
    endTime: { type: Date },
    charactersFound: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    score: { type: Number },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Session", SessionModel);
