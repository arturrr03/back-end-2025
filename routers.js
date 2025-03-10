const express = require("express");
const routers = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uploud = multer({ dest: "public" });
const users = require("./users");

// Endpoint 1
routers.get("/users", (req, res) => {
  res.json(users);
});

//Endpoint 2
routers.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === name);

  if (!user) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }
  res.json(user);
});

// Endpoint 3
routers.post("/users", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.json({
      message: "Masukkan data yang akan diubah",
    });
  } else {
    // nama diubah menjadi titlecase
    let name = req.params.name.toLowerCase();
    let firstLetter = name.charAt(0).toUpperCase();
    name = firstLetter + name.slice(1);
    users.push({
      id: Number(req.body.id),
      name: name,
    });
    res.json(users);
  }
});

// Endpoint 4
routers.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "assets", "dummy.png");
  res.sendFile(filePath);
});

// Endpoint 5
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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

// Endpoint 6
routers.put("/users/:name", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.json({
      message: "Masukkan data yang akan diubah",
    });
  }
  // nama diubah menjadi titlecase
  let name = req.params.name.toLowerCase();
  let firstLetter = name.charAt(0).toUpperCase();
  name = firstLetter + name.slice(1);
  // kirim data berdasark nama
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      users[i].name = req.body.name;
      users[i].id = req.body.id;

      res.json(users[i]);
    }
  }
  // kirim pesan apabila data tidak ditemukan
  res.json({
    message: "Data user tidak ditemukan",
  });
});

// Endpoint 7
routers.delete("/users/:name", (req, res) => {
  // nama diubah menjadi titlecase
  let name = req.params.name.toLowerCase();
  let firstLetter = name.charAt(0).toUpperCase();
  name = firstLetter + name.slice(1);

  const itemToDelete = users.find((el) => el.name === name);
  const index = users.indexOf(itemToDelete);

  users.splice(index, 1);
  res.json(users);
});

module.exports = routers;