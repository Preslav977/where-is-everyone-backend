const express = require("express");

const router = express.Router();

const Session = require("../models/session");

const Character = require("../models/character");

router.post("/start", async (req, res, next) => {
  const session = new Session({
    startTime: new Date(),
    charactersFound: req.body.charactersFound,
    score: 0,
  });

  await session.save();

  res.json(session);
});

router.post("/end/:id", async (req, res, next) => {
  const { id } = req.body;

  const characters = await Character.find({ marked: true }).exec();

  const filterMarkedCharacters = characters.filter(
    (char) => char.marked,
  ).length;

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

    const updateScore = await Session.findByIdAndUpdate(
      { _id: id },

      { score: findEndTime.startTime - findEndTime.endTime },
    );

    res.json(updateScore);
  }
});

module.exports = router;
