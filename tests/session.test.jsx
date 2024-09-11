const request = require("supertest");

const mongoose = require("mongoose");

const express = require("express");

const sessionRouter = require("../routes/session");

const initializeMongoServer = require("../mongoConfigTesting");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/session", sessionRouter);

describe("testing the session game routes and controllers", () => {
  beforeAll(() => initializeMongoServer());

  afterAll((done) => {
    mongoose.connection.close();

    done();
  });

  test("should fetch the session object by id", async () => {
    const response = await request(app).get(
      "/session/66e16a5bdaf6641cdf3f5311",
    );

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.characters[0].character).toEqual(
      response.body.characters[0].character,
    );

    expect(response.body.characters[0].marked).toBe(false);

    expect(response.body.characters[0]._id).toEqual(
      response.body.characters[0]._id,
    );

    expect(response.status).toBe(200);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.characters[1].character).toEqual(
      response.body.characters[1].character,
    );

    expect(response.body.characters[1].marked).toBe(false);

    expect(response.body.characters[1]._id).toEqual(
      response.body.characters[1]._id,
    );

    expect(response.status).toBe(200);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.characters[1].character).toEqual(
      response.body.characters[1].character,
    );

    expect(response.body.characters[1].marked).toBe(false);

    expect(response.body.characters[1]._id).toEqual(
      response.body.characters[1]._id,
    );

    expect(response.status).toBe(200);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.characters[2].character).toEqual(
      response.body.characters[2].character,
    );

    expect(response.body.characters[2].marked).toBe(false);

    expect(response.body.characters[2]._id).toEqual(
      response.body.characters[2]._id,
    );

    expect(response.status).toBe(200);
  });

  test("should return target not found if character is not marked", async () => {
    const response = await request(app).post("/session/:coordinates").send({
      id: "66e16a5bdaf6641cdf3f5311",
      characterId: "66e16828d98682c1bc4f9521",
      lowerX: 5.117493473,
      upperX: 6.117493473,
      lowerY: 42.176823558,
      upperY: 43.176823558,
    });

    expect(response.body.message).toEqual("Target not found");
  });

  test("should return marked true if the character is found", async () => {
    const response = await request(app).post("/session/:coordinates").send({
      id: "66e16a5bdaf6641cdf3f5311",
      characterId: "66e16828d98682c1bc4f9521",
      lowerX: 1.646542261251372,
      upperX: 9.330406147091107,
      lowerY: 39.97472415301609,
      upperY: 45.41875273416614,
    });

    expect(response.body[0].character).toBe(response.body[0].character);

    expect(response.body[0].marked).toBe(true);

    expect(response.body[1].character).toBe(response.body[1].character);

    expect(response.body[1].marked).toBe(false);

    expect(response.body[2].character).toBe(response.body[2].character);

    expect(response.body[2].marked).toBe(false);
  });

  test("should return two marked characters if the two characters are found", async () => {
    let response = await request(app).post("/session/:coordinates").send({
      id: "66e16a5bdaf6641cdf3f5311",
      characterId: "66e16828d98682c1bc4f9521",
      lowerX: 1.646542261251372,
      upperX: 9.330406147091107,
      lowerY: 39.97472415301609,
      upperY: 45.41875273416614,
    });

    response = await request(app).post("/session/:coordinates").send({
      id: "66e16a5bdaf6641cdf3f5311",
      characterId: "66e1666f014cd8d11fbe255f",
      lowerX: 62.45883644346871,
      upperX: 70.14270032930845,
      lowerY: 39.585864968648224,
      upperY: 45.02989354979828,
    });

    expect(response.body[0].character).toBe(response.body[0].character);

    expect(response.body[0].marked).toBe(true);

    expect(response.body[1].character).toBe(response.body[1].character);

    expect(response.body[1].marked).toBe(true);

    expect(response.body[2].character).toBe(response.body[2].character);

    expect(response.body[2].marked).toBe(false);
  });

  test("should return two marked characters if the two characters are found", async () => {
    let response = await request(app).post("/session/:coordinates").send({
      id: "66e16a5bdaf6641cdf3f5311",
      characterId: "66e16828d98682c1bc4f9521",
      lowerX: 1.646542261251372,
      upperX: 9.330406147091107,
      lowerY: 39.97472415301609,
      upperY: 45.41875273416614,
    });

    response = await request(app).post("/session/:coordinates").send({
      id: "66e16a5bdaf6641cdf3f5311",
      characterId: "66e1666f014cd8d11fbe255f",
      lowerX: 62.45883644346871,
      upperX: 70.14270032930845,
      lowerY: 39.585864968648224,
      upperY: 45.02989354979828,
    });

    response = await request(app).post("/session/:coordinates").send({
      id: "66e16a5bdaf6641cdf3f5311",
      characterId: "66e1666f014cd8d11fbe2561",
      lowerX: 72.00878155872668,
      upperX: 79.69264544456641,
      lowerY: 62.76187235697274,
      upperY: 68.20590093812278,
    });

    expect(response.body[0].character).toBe(response.body[0].character);

    expect(response.body[0].marked).toBe(true);

    expect(response.body[1].character).toBe(response.body[1].character);

    expect(response.body[1].marked).toBe(true);

    expect(response.body[2].character).toBe(response.body[2].character);

    expect(response.body[2].marked).toBe(true);
  });

  test("testing if the game is done", async () => {
    const response = await request(app).put("/session/:id").send({
      id: "66e16a5bdaf6641cdf3f5311",
    });

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.endTime).toEqual(response.body.endTime);

    expect(response.status).toBe(200);
  });
});
