const request = require("supertest");

const mongoose = require("mongoose");

const express = require("express");

const characterRouter = require("../routes/character");

const initializeMongoServer = require("../mongoConfigTesting");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/characters", characterRouter);

describe("testing the game routers and controllers", () => {
  beforeAll(() => initializeMongoServer());

  afterAll((done) => {
    mongoose.connection.close();

    done();
  });

  test("should fetch the characters from game one object", async () => {
    const response = await request(app).get(
      "/characters/66e14f7d0bd6bb687c90b430",
    );

    console.log(response.body);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[0]._id).toBe(response.body[0]._id);

    expect(response.body[0].game).toBe(response.body[0].game);

    expect(response.body[0].character_name).toBe("Raft Man");

    expect(response.body[0].character_image).toBe(
      "http://localhost:3000/raft-man.png",
    );

    expect(response.body[0].coordinateX).toBe(5.117493473);

    expect(response.body[0].coordinateY).toBe(42.176823558);

    expect(response.body[0].marked).toBe(false);

    expect(response.status).toBe(200);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[1]._id).toBe(response.body[1]._id);

    expect(response.body[1].game).toBe(response.body[1].game);

    expect(response.body[1].character_name).toBe("Dragon");

    expect(response.body[1].character_image).toBe(
      "http://localhost:3000/dragon.png",
    );

    expect(response.body[1].coordinateX).toBe(66.266318538);

    expect(response.body[1].coordinateY).toBe(42.509798481);

    expect(response.body[1].marked).toBe(false);

    expect(response.status).toBe(200);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[2]._id).toBe(response.body[2]._id);

    expect(response.body[2].game).toBe(response.body[2].game);

    expect(response.body[2].character_name).toBe("Wizard");

    expect(response.body[2].character_image).toBe(
      "http://localhost:3000/wizard.png",
    );

    expect(response.body[2].coordinateX).toBe(75.874673629);

    expect(response.body[2].coordinateY).toBe(65.855040292);

    expect(response.body[2].marked).toBe(false);

    expect(response.status).toBe(200);
  });
});
