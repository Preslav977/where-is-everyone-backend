const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");

const Character = require("../models/character");

router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    const character = new Character({
      photo: req.body.photo,
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
    const character = await Character.find().populate({ path: "photo" }).exec();

    res.json(character);
  }),
);

router.get(
  "/:mouseCoordinateX/:mouseCoordinateY",
  asyncHandler(async (req, res, next) => {
    const { mouseCoordinateX, mouseCoordinateY } = req.body;

    console.log(mouseCoordinateX, mouseCoordinateY);

    const character = await Character.find({
      coordinateX: mouseCoordinateX,
    }).exec();

    if (character.coordinateX <= mouseCoordinateX) {
      res.json("test");
    }

    // if (character === null) {
    //   res.json("Target not found");
    // } else {
    //   res.json(`You found ${character.character_name}`);
    // }

    // res.json(character);
  }),
);

module.exports = router;
