const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");
const Photo = require("../models/photo");

router.post(
  "/photos",

  asyncHandler(async (req, res, next) => {
    const photo = new Photo({
      image_link: req.body.image_link,
    });

    await photo.save();

    res.json(photo);
  }),
);

router.get(
  "/photos",
  asyncHandler(async (req, res, next) => {
    const photo = await Photo.find().exec();

    res.json(photo);
  }),
);

module.exports = router;
