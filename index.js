const express = require("express");
const moment = require("moment");
const users = require("./users");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("This is the home page");
});
app.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "respone success",
    description: "Exercise #02",
    date: moment().format(),
  })
);

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});