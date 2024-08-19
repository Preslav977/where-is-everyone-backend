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
      leaderboard: req.body.leaderboard,
    });

    await photo.save();

    res.json(photo);
  }),
);

router.get(
  "/photos",
  asyncHandler(async (req, res, next) => {
    const photo = await Photo.find()
      .populate("characters")
      .populate("leaderboard")
      .exec();

    res.json(photo);
  }),
);

router.get("/photos/:id", async (req, res, next) => {
  const { id } = req.params;

  const photo = await Photo.findById(id)
    .populate("characters")
    .populate({ path: "leaderboard", populate: { path: "users" } })
    .exec();

  res.json(photo);
});

module.exports = router;
