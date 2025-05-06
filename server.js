"use strict";
const express = require("express");
const app = express();
const port = 3000;
const authRoutes = require("./auth/auth.routes");
const storyRoutes = require("./story/story.routes");
const taskRoutes = require("./task/task.routes");
const personRoutes = require("./person/person.routes");

app.use(express.json()); // Add this line
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header", authHeader);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.use("/auth", authRoutes);
app.use("/person", personRoutes);
app.use("/stories", storyRoutes);
app.use("/task", taskRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
