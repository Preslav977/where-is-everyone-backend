const express = require("express");

const router = express.Router();

const Session = require("../models/session");

const Character = require("../models/character");

router.post("/", async (req, res, next) => {
  const session = new Session({
    game: req.body.game,
    foundCharacters: [],
    startTime: new Date(),
  });

  await session.save();

  res.json(session);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.body;

  const session = await Session.findById(id)
    .populate({ path: "game", populate: { path: "characters" } })
    .exec();

  res.json(session);
});

router.post("/:id", async (req, res, next) => {
  const { id, characterId } = req.body;

  const session = await Session.findById(id).exec();

  const character = await Character.findById(characterId).exec();

  console.log(character);

  if (character) {
    session.foundCharacters.push(character);

    await session.save();
  }

  res.json(session);
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.body;

  console.log(id);

  const session = await Session.findById(id).exec();

  const filterMarkedCharacters = session.foundCharacters.length;

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
  }
});

module.exports = router;
