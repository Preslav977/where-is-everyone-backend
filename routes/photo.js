const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");
const Photo = require("../models/photo");

router.post(
  "/photos",

  asyncHandler(async (req, res, next) => {
    const photo = new Photo({
      image_link: req.body.image_link,
      characters: req.body.characters,
    });

    await photo.save();

    res.json(photo);
  }),
);

router.get(
  "/photos",
  asyncHandler(async (req, res, next) => {
    const photo = await Photo.findOne().populate("characters").exec();

    res.json(photo);
  }),
);

module.exports = router;
