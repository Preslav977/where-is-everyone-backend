const express = require("express");

const router = express.Router();

const Session = require("../models/session");

const Character = require("../models/character");

router.post("/", async (req, res, next) => {
  const session = new Session({
    game: req.body.game,
    characters: req.body.characters,
    startTime: new Date(),
  });

  await session.save();

  res.json(session);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const session = await Session.findById(id)
    .populate("game")
    .populate("characters")
    .exec();

  res.json(session);
});

router.post("/:coordinates", async (req, res, next) => {
  const { id, characterId, lowerX, upperX, lowerY, upperY } = req.body;

  const [session, character] = await Promise.all([
    await Session.findById(id).exec(),
    await Character.findById(characterId).exec(),
  ]);

  if (
    character.coordinateX <= lowerX ||
    character.coordinateX >= upperX ||
    character.coordinateY <= lowerY ||
    character.coordinateY >= upperY
  ) {
    res.json({ message: "Target not found" });
  } else {
    session.characters = session.characters.map((char) => {
      if (char.id === characterId) {
        return { ...char, marked: true };
      }

      return char;
    });
    await session.save();

    res.json(session.characters);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.body;

  const session = await Session.findById(id).exec();

  const filterMarkedCharacters = session.characters.filter(
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

    res.json(findEndTime);
  }
});

module.exports = router;
