const request = require("supertest");

const mongoose = require("mongoose");

const express = require("express");

const gameRouter = require("../routes/game");

const initializeMongoServer = require("../mongoConfigTesting");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", gameRouter);

describe("testing the game routers and controller", () => {
  beforeAll(() => initializeMongoServer());

  afterAll((done) => {
    mongoose.connection.close();

    done();
  });

  test("should fetch game one object", async () => {
    const response = await request(app).get("/games");

    console.log(response.body[0].leaderboard);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[0]._id).toBe(response.body[0]._id);

    expect(response.body[0].image_link).toEqual(
      "http://localhost:3000/dragon-charmers-island.jpg",
    );

    expect(response.body[0].game_name).toBe("Dragon Charmer's Island");

    expect(response.body[0].leaderboard._id).toEqual(
      "66e136c6b03890319064c08a",
    );

    expect(response.body[0].leaderboard.users).toEqual([]);

    expect(response.status).toBe(200);
  });

  test("should create new game object", async () => {
    const response = await request(app).post("/games").send({
      image_link: "http://localhost:3000/super-mario-bros.jpg",
      game_name: "Super Mario Bros",
      leaderboard: "66e14bd5679fb674bc5822e2",
    });

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.image_link).toEqual(
      "http://localhost:3000/super-mario-bros.jpg",
    );

    expect(response.body.game_name).toEqual("Super Mario Bros");

    expect(response.body.leaderboard[0]._id).toEqual(
      response.body.leaderboard[0]._id,
    );

    expect(response.status).toBe(200);
  });

  test("should create another new game object", async () => {
    const response = await request(app).post("/games").send({
      image_link: "http://localhost:3000/universe-113.jpg",
      game_name: "Universe 113",
      leaderboard: "66e14d08f933d36a6765a954",
    });

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.image_link).toEqual(
      "http://localhost:3000/universe-113.jpg",
    );

    expect(response.body.game_name).toEqual("Universe 113");

    expect(response.body.leaderboard[0]._id).toEqual(
      response.body.leaderboard[0]._id,
    );

    expect(response.status).toBe(200);
  });

  test("should fetch all games", async () => {
    const response = await request(app).get("/games");

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[0]._id).toBe(response.body[0]._id);

    expect(response.body[0].image_link).toEqual(
      "http://localhost:3000/dragon-charmers-island.jpg",
    );

    expect(response.body[0].game_name).toBe("Dragon Charmer's Island");

    expect(response.body[0].leaderboard._id).toEqual(
      "66e136c6b03890319064c08a",
    );

    expect(response.body[0].leaderboard.users).toEqual([]);

    expect(response.status).toBe(200);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[1]._id).toBe(response.body[1]._id);

    expect(response.body[1].image_link).toEqual(
      "http://localhost:3000/super-mario-bros.jpg",
    );

    expect(response.body[1].game_name).toBe("Super Mario Bros");

    expect(response.body[1].leaderboard._id).toEqual(
      "66e14bd5679fb674bc5822e2",
    );

    expect(response.body[1].leaderboard.users).toEqual([]);

    expect(response.status).toBe(200);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[2]._id).toBe(response.body[2]._id);

    expect(response.body[2].image_link).toEqual(
      "http://localhost:3000/universe-113.jpg",
    );

    expect(response.body[2].game_name).toBe("Universe 113");

    expect(response.body[2].leaderboard._id).toEqual(
      "66e14d08f933d36a6765a954",
    );

    expect(response.body[2].leaderboard.users).toEqual([]);

    expect(response.status).toBe(200);
  });

  test("should fetch game one by ID", async () => {
    const response = await request(app).get("/games/66e14f7d0bd6bb687c90b430");

    console.log(response.body);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.image_link).toEqual(
      "http://localhost:3000/dragon-charmers-island.jpg",
    );

    expect(response.body.game_name).toEqual("Dragon Charmer's Island");

    expect(response.body.leaderboard._id).toEqual(
      response.body.leaderboard._id,
    );

    expect(response.status).toBe(200);
  });
});
