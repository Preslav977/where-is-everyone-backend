const express = require("express");

const router = express.Router();

const Session = require("../models/session");

const Character = require("../models/character");

router.post("/", async (req, res, next) => {
  const session = new Session({
    photo: req.body.photo,
    startTime: new Date(),
  });

  await session.save();

  res.json(session);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.body;

  const session = await Session.findById(id)
    .populate({ path: "photo", populate: { path: "characters" } })
    .exec();

  res.json(session);
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.body;

  console.log(id);

  const characters = await Character.find({ marked: true }).exec();

  console.log(characters);

  const filterMarkedCharacters = characters.filter(
    (char) => char.marked,
  ).length;

  console.log(filterMarkedCharacters);

  if (filterMarkedCharacters === 3) {
    const updateEndTime = {
      endTime: new Date(),
      _id: id,
    };

    const findEndTime = await Session.findByIdAndUpdate(
      { _id: id },

      updateEndTime,

      { new: true },
    );

    res.json(findEndTime);
  } else {
    res.json("Game is still playing!");
  }
});

module.exports = router;