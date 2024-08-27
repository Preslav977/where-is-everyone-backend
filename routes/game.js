const express = require("express");

const router = express.Router();

const { ObjectId } = require("mongodb");
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

router.post("/game/:coordinates", async (req, res, next) => {
  const { id, characterId, lowerX, upperX, lowerY, upperY } = req.body;

  console.log(id);

  const game = await Game.findById(id).populate("characters").exec();
  const [characterOne, characterTwo, characterThree] = game.characters;
  // if (
  //   characterOne.coordinateX <= lowerX ||
  //   characterOne.coordinateX >= upperX ||
  //   characterOne.coordinateY <= lowerY ||
  //   characterOne.coordinateY >= upperY
  // ) {
  //   res.json({ message: "Target not found" });
  // } else {
  //   const updateCharacterToMarked = await Game.findById(id).populate(
  //     "characters",
  //   )(
  //     { _id: id },
  //     {
  //       $set: { "characters.$[1].marked": true },
  //     },
  //     { arrayFilters: [{ "$[0].marked": false }] },
  //   );
  //   res.json(updateCharacterToMarked);
  // }

  if (
    characterOne.coordinateX <= lowerX ||
    characterOne.coordinateX >= upperX ||
    characterOne.coordinateY <= lowerY ||
    characterOne.coordinateY >= upperY
  ) {
    res.json({ message: "Target not found" });
  } else if (ObjectId.isValid(id)) {
    const updateCharacterToMarked = await Game.updateOne(
      { _id: characterId },
      {
        $set: { "characters.$[0].marked": true },
      },

      { arrayFilters: [{ "$[0].marked": false }], new: true },
    ).populate("characters");
    res.json(updateCharacterToMarked);
  }
});

module.exports = router;
