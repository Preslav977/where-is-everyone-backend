const request = require("supertest");

const mongoose = require("mongoose");

const express = require("express");

const userRouter = require("../routes/users");

const initializeMongoServer = require("../mongoConfigTesting");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

describe("testing user routes and controllers", () => {
  beforeAll(() => initializeMongoServer());

  afterAll((done) => {
    mongoose.connection.close();

    done();
  });

  test("if the user object can be fetched ", async () => {
    const response = await request(app).get("/users");

    // console.log(response.body);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[0]._id).toBe(response.body[0]._id);

    expect(response.body[0].username).toEqual("user");

    expect(response.body[0].score).toEqual(26);

    expect(response.body[0].date).toBe(response.body[0].date);

    expect(response.status).toBe(200);
  });

  test("username object username constraints must be met in order to create it ", async () => {
    const response = await request(app).post("/users").send({
      username: "",
      score: 1,
    });

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body.message).toBe(
      "Failed to create user the constrains are not met.",
    );
  });

  test("username object score is required", async () => {
    const response = await request(app).post("/users").send({
      username: "user",
      score: "",
    });

    expect(response.status).toBe(500);
  });

  test("should create new user", async () => {
    const response = await request(app).post("/users").send({
      username: "user",
      score: 20,
    });

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body._id).toBe(response.body._id);

    expect(response.body.username).toEqual("user");

    expect(response.body.score).toEqual(20);

    expect(response.body.date).toBe(response.body.date);

    expect(response.status).toBe(200);
  });

  test("should fetch the new user", async () => {
    const response = await request(app).get("/users");

    // console.log(response.body);

    expect(response.header["content-type"]).toMatch(/json/);

    expect(response.body[1]._id).toBe(response.body[1]._id);

    expect(response.body[1].username).toEqual("user");

    expect(response.body[1].score).toEqual(20);

    expect(response.body[1].date).toBe(response.body[1].date);

    expect(response.status).toBe(200);
  });
});
