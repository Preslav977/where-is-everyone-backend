const express = require("express");

const router = express.Router();

const Game = require("../models/game");

router.post(
  "/games",

  async (req, res, next) => {
    const game = new Game({
      image_link: req.body.image_link,
      game_name: req.body.game_name,
      leaderboard: req.body.leaderboard,
    });

    await game.save();

    res.json(game);
  },
);

router.get("/games", async (req, res, next) => {
  const options = { sort: { score: 1 } };

  const games = await Game.find()
    .populate({ path: "leaderboard", populate: { path: "users", options } })
    .exec();

  res.json(games);
});

router.get("/games/:id", async (req, res, next) => {
  const { id } = req.params;

  const options = { sort: { score: 1 } };

  const findSingleGame = await Game.findById(id)
    .populate({ path: "leaderboard", populate: { path: "users", options } })
    .sort({ score: 1 })
    .exec();

  res.json(findSingleGame);
});

module.exports = router;
