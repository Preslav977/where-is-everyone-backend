require("dotenv").config();

const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_URL;

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongo connection error"));
