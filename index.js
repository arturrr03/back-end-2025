const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const router = require("./routers");

const app = express();

app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "PUT"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.use(router);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "terjadi kesalahan pada server",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);