require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const mongoose = require("./mongoConfig");
const usersRouter = require("./routes/users");
const gameRouter = require("./routes/game");
const characterRouter = require("./routes/character");
const sessionRouter = require("./routes/session");
const leaderBoardRouter = require("./routes/leaderboard");

const app = express();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(helmet());

app.use(limiter);

app.use(
  cors({
    origin: [
      "https://where-is-everyone-backend.vercel.app",
      "https://where-is-everyone-frontend.vercel.app",
    ],
  }),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(compression());

app.use("/", gameRouter);
app.use("/characters", characterRouter);
app.use("/users", usersRouter);
app.use("/session", sessionRouter);
app.use("/leaderboard", leaderBoardRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render("error");
});

module.exports = app;
