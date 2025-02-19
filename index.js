const express = require("express");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const users = require("./users")
const app = express();
app.get("/users", (req, res) => {
  res.json(users);
});

// Middleware untuk logging
app.use(morgan("tiny"));

// Routing dinamis menggunakan params
app.get("/users/:name", (req, res) => {
  const name = req.status.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === name);

  if (!user){
      return res.status(404).json({
        message : "data users tidak ditemukan"
      })
  }
  res.json(user)
});

// Middleware untuk menangani 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Middleware untuk menangani error secara global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
