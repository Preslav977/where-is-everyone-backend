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

router.put("/photos/:id", async (req, res, next) => {
  const { id } = req.body;

  const character = await Photo.findByIdAndUpdate(
    id,
    { marked: false },
    { new: true },
  );

  res.json(character);
});

module.exports = router;
