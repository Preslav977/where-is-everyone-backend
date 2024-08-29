const express = require("express");

const router = express.Router();

const Session = require("../models/session");

router.post("/", async (req, res, next) => {
  const session = new Session({
    game: "66cef736458e081fa40f85a2",
    characters: [
      {
        character_name: "Raft Man",
        character_image: "http://localhost:3000/raft-man.png",
        coordinateX: 5.117493473,
        coordinateY: 42.176823558,
        marked: false,
      },
    ],
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

  const session = await Session.findById(id).exec();

  if (
    session.coordinateX <= lowerX ||
    session.coordinateX >= upperX ||
    session.coordinateY <= lowerY ||
    session.coordinateY >= upperY
  ) {
    res.json({ message: "Target not found" });
  } else {
    const updateCharacterToMarked = await Session.findByIdAndUpdate(
      id,
      {
        $set: { "characters.$[c].marked": true },
      },
      { arrayFilters: [{ "c.character_id": characterId }], new: true },
    );
    res.json(updateCharacterToMarked);
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
