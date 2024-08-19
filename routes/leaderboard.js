const express = require("express");

const router = express.Router();

const LeaderBoard = require("../models/leaderboard");

router.post("/", async (req, res, next) => {
  const leaderboard = new LeaderBoard({
    users: [],
  });

  await leaderboard.save();

  res.json(leaderboard);
});

router.get("/", async (req, res, next) => {
  const leaderboard = await LeaderBoard.find().populate("photo").exec();

  res.json(leaderboard);
});

router.post("/:id", async (req, res, next) => {
  const { id, userId } = req.body;

  console.log(id);

  const leaderboard = await LeaderBoard.findById(id).exec();

  leaderboard.users.push(userId);

  await leaderboard.save();
  res.json(leaderboard);
});

module.exports = router;
