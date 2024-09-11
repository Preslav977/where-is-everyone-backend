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
}

module.exports = initializeMongoServer;
