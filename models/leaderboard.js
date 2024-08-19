const mongoose = require("mongoose");

const { Schema } = mongoose;

const LeaderBoardModel = new Schema({
  users: [{ type: Schema.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("LeaderBoard", LeaderBoardModel);
