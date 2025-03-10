const express = require("express");
const routers = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uploud = multer({ dest: "public" });


routers.post("/upload", uploud.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    res.send("file berhasil diupload");
  } else {
    res.send("file gagal diupload");
  }
});

routers.get("/download", (req, res) => {
  const filename = "/photo.png";
  res.download(path.join(__dirname, filename), "photo.png");
});
// routers.get("/download", (req, res) => {
//   const filename = "/photo.png";
//   res.sendFile(__dirname + filename);
// });
// Routing
routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    message: "Login page",
    data: {
      username: username,
      password: password,
    },
  });
});
routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
routers.put("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
routers.post("/contoh", (req, res) => res.send("request method POST"));
routers.put("/contoh", (req, res) => res.send("Request method PUT"));
routers.delete("/contoh", (req, res) => res.send("Request method DELETE"));
routers.patch("/contoh", (req, res) => res.send("Request method PATCH"));

routers.all("/universal", (req, res) =>
  res.send(`Request method ${req.method}`)
);
// Routing dinamis
// 1. Menggunakan params
routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);
// 2. Menggunakan Query String
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query string= page :${page}, sort : ${sort}`);
});

module.exports = routers;