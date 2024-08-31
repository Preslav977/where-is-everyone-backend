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

  const session = await Session.findById(id).populate("characters").exec();

  const characters = await Character.findById(characterId).exec();

  console.log(session, characters);

  if (
    characters.coordinateX <= lowerX ||
    characters.coordinateX >= upperX ||
    characters.coordinateY <= lowerY ||
    characters.coordinateY >= upperY
  ) {
    res.json({ message: "Target not found" });
  } else {
    //   const updateCharacterToMarked = await Session.findByIdAndUpdate(
    //     id,
    //     {
    //       $set: { "characters.$[c].marked": true },
    //     },
    //     { arrayFilters: [{ "c.character_name": characterName }], new: true },
    //   );
    //   res.json(updateCharacterToMarked);
    res.json({ ...characters, marked: true });
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.body;

  console.log(id);

  const session = await Session.findById(id).exec();

  const filterMarkedCharacters = session.characters.filter(
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
  }
});

module.exports = router;
