const express = require("express");

const router = express.Router();

const Character = require("../models/character");

router.post("/", async (req, res, next) => {
  const character = new Character({
    game: req.body.game,
    character_name: req.body.character_name,
    character_image: req.body.character_image,
    coordinateX: req.body.coordinateX,
    coordinateY: req.body.coordinateY,
    marked: false,
  });

  await character.save();

  res.json(character);
});

router.get("/:game", async (req, res, next) => {
  const { game } = req.params;

  const character = await Character.find({ game }).exec();

  res.json(character);
});

module.exports = router;
