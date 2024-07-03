const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

logger.info("Connecting to db...");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

const app = express();

app.use(express.static("dist"));
app.use("/login", express.static("dist"));
app.use("/users", express.static("dist"));
app.use("/users/:id", express.static("dist"));
app.use("/blogs/:id", express.static("dist"));

app.get("/healthz", (req, res) => {
  res.send("ok");
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", usersRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.unknownRoute);
app.use(middleware.errorHandler);

module.exports = app;
