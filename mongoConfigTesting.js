const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Leadeboard = require("./models/leaderboard");

const Game = require("./models/game");

const Characters = require("./models/character");

const Session = require("./models/session");

const User = require("./models/user");

async function initializeMongoServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });

  const leaderboardGameOne = new Leadeboard({
    _id: "66e136c6b03890319064c08a",
    users: [],
  });

  await leaderboardGameOne.save();

  // console.log(leaderboardGameOne);

  const leaderboardGameTwo = new Leadeboard({
    _id: "66e14bd5679fb674bc5822e2",
    users: [],
  });

  await leaderboardGameTwo.save();

  const leaderboardGameThree = Leadeboard({
    _id: "66e14d08f933d36a6765a954",
    users: [],
  });

  await leaderboardGameThree.save();

  // console.log(leaderboardGameThree);

  const user = new User({
    _id: "66e136358f6e7d2b7ed1dc11",
    username: "user",
    score: 26,
    date: new Date(),
  });

  await user.save();

  const gameOne = new Game({
    _id: "66e14f7d0bd6bb687c90b430",
    image_link: "http://localhost:3000/dragon-charmers-island.jpg",
    game_name: "Dragon Charmer's Island",
    leaderboard: "66e136c6b03890319064c08a",
  });

  await gameOne.save();

  // console.log(gameOne);

  const raftMan = new Characters({
    _id: "66e16828d98682c1bc4f9521",
    game: "66e14f7d0bd6bb687c90b430",
    character_name: "Raft Man",
    character_image: "http://localhost:3000/raft-man.png",
    coordinateX: 5.117493473,
    coordinateY: 42.176823558,
    marked: false,
  });

  await raftMan.save();

  // console.log(raftMan);

  const dragon = new Characters({
    _id: "66e1666f014cd8d11fbe255f",
    game: "66e14f7d0bd6bb687c90b430",
    character_name: "Dragon",
    character_image: "http://localhost:3000/dragon.png",
    coordinateX: 66.266318538,
    coordinateY: 42.509798481,
    marked: false,
  });

  await dragon.save();

  // console.log(dragon);

  const wizard = new Characters({
    _id: "66e1666f014cd8d11fbe2561",
    game: "66e14f7d0bd6bb687c90b430",
    character_name: "Wizard",
    character_image: "http://localhost:3000/wizard.png",
    coordinateX: 75.874673629,
    coordinateY: 65.855040292,
    marked: false,
  });

  await wizard.save();

  // console.log(wizard);

  const session = new Session({
    _id: "66e16a5bdaf6641cdf3f5311",
    game: "66e14f7d0bd6bb687c90b430",
    characters: [
      {
        character: "66e16828d98682c1bc4f9521",
        _id: "66e16828d98682c1bc4f9521",
      },
      {
        character: "66e1666f014cd8d11fbe255f",
        _id: "66e1666f014cd8d11fbe255f",
      },
      {
        character: "66e1666f014cd8d11fbe2561",
        _id: "66e1666f014cd8d11fbe2561",
      },
    ],
  });

  await session.save();

  // console.log(session);
}

module.exports = initializeMongoServer;
