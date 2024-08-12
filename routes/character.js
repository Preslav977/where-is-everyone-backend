const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");

const Character = require("../models/character");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const character = new Character({
      character_name: req.body.character_name,
      character_image: req.body.character_image,
      coordinateX: req.body.coordinateX,
      coordinateY: req.body.coordinateY,
      marked: req.body.marked,
    });

    await character.save();
    res.json(character);
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const character = await Character.find().populate().exec();

    res.json(character);
  }),
);

router.post(
  "/:coordinates",
  asyncHandler(async (req, res, next) => {
    const { id, lowerX, upperX, lowerY, upperY } = req.body;

    const character = await Character.findById(id).exec();

    if (
      character.coordinateX <= lowerX ||
      character.coordinateX >= upperX ||
      character.coordinateY <= lowerY ||
      character.coordinateY >= upperY
    ) {
      res.json({ message: "Target not found" });
    } else {
      const updateCharacterToMarked = await Character.findByIdAndUpdate(
        id,
        {
          marked: true,
        },
        { new: true },
      );
      res.json(updateCharacterToMarked);
    }
  }),
);

module.exports = router;
