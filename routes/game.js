const express = require("express");

const router = express.Router();

const Game = require("../models/game");

router.post(
  "/games",

  async (req, res, next) => {
    const game = new Game({
      image_link: req.body.image_link,
      game_name: req.body.game_name,
      characters: req.body.characters,
      leaderboard: req.body.leaderboard,
    });

    await game.save();

    res.json(game);
  },
);

router.get("/games", async (req, res, next) => {
  const options = { sort: { score: 1 } };

  const games = await Game.find()
    .populate("characters")
    .populate({ path: "leaderboard", populate: { path: "users", options } })
    .exec();

  res.json(games);
});

router.get("/game/:id", async (req, res, next) => {
  const { id } = req.params;

  const options = { sort: { score: 1 } };

  const game = await Game.findById(id)
    .populate("characters")
    .populate({ path: "leaderboard", populate: { path: "users", options } })
    .sort({ score: 1 })
    .exec();

  res.json(game);
});

module.exports = router;
