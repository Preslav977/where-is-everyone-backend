const request = require("supertest");

const mongoose = require("mongoose");

const express = require("express");

const leaderboardRouter = require("../routes/leaderboard");

const initializeMongoServer = require("../mongoConfigTesting");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/leaderboard", leaderboardRouter);

describe("testing leaderboard routes and controllers", () => {
  beforeAll(() => initializeMongoServer());

  afterAll((done) => {
    mongoose.connection.close();

    done();
  });

  test("testing if leaderboard can be fetched", async () => {
    const response = await request(app).get("/leaderboard");

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[0].users).toEqual([]);

    expect(response.status).toBe(200);
  });

  test("testing if the leaderboard is creating new object", async () => {
    const response = await request(app)
      .post("/leaderboard")
      .send({ _id: "123" });

    // console.log(response);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body._id).toEqual(response.body._id);

    expect(response.body.users).toEqual([]);

    expect(response.status).toBe(200);
  });

  test("testing if leaderboard can push user object", async () => {
    const response = await request(app).post("/leaderboard/:id").send({
      id: "66e136c6b03890319064c08a",
      userId: "66e136358f6e7d2b7ed1dc11",
    });

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.users).toEqual(["66e136358f6e7d2b7ed1dc11"]);

    expect(response.status).toBe(200);
  });

  test("testing if leaderboard has user into the users array", async () => {
    const response = await request(app).get("/leaderboard");

    expect(response.header["content-type"]).toMatch(/json/);

    console.log(response.body[0].users);

    expect(response.body[0].users[0]._id).toEqual("66e136358f6e7d2b7ed1dc11");

    expect(response.body[0].users[0].date).toEqual(
      response.body[0].users[0].date,
    );

    expect(response.body[0].users[0].score).toEqual(26);

    expect(response.body[0].users[0].username).toEqual("user");

    expect(response.status).toBe(200);
  });
});
