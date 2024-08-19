const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");
const User = require("../models/user");

router.post(
  "/",

  body("username", "Username must be between 1 and 30 characters long.")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 30 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      score: req.body.score,
      photo: req.body.photo,
    });

    if (!errors.isEmpty()) {
      res.json({
        message: "Failed to create user the constrains are not met.",
      });
    } else {
      await user.save();
      res.json(user);
    }
  }),

  router.get("/", async (req, res, next) => {
    const users = await User.find().exec();

    res.json(users);
  }),
);

module.exports = router;
