const express = require("express");
const routers = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uploud = multer({ dest: "public" });
// const users = require("./users");
const client = require("./mongodb");
const { error } = require("console");
const ObjectId = require("mongodb").ObjectId;
// Endpoint 1
// routers.get("/users", (req, res) => {
//   res.json(users);
// });

routers.get("/users", async (req,res)=>{
  try{
    const db = client.db("latihan");
    const users = await db.collection("users").find().toArray()
    res.json({
      status: "success",
      message: "list users",
      data: users,
    });
    
  }catch{error}{
    res.json({
      status : 'error',
    });f
  }
});

// get single users
routers.get("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan");
    const user = await db.collection("users").findOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).json({
      status: "success",
      message: "user found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});
//insert user
 routers.post("/users", async (req, res) => {
  try {
    const db = client.db("latihan");
    const user = await db.collection("users").insertOne(req.body);
    res.status(201).json({
      status: "success",
      message: "user created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});
//update users
routers.put("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan");
    const user = await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json({
      status: "success",
      message: "user updated",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});
//delete users
routers.delete("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan");
    const user = await db.collection("users").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).json({
      status: "success",
      message: "user deleted",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});
//Get orders users
routers.get("/users-with-orders", async (req, res) => {
  try {
    const db = client.db("latihan");
    const usersWithOrders = await db.collection("users").aggregate([
      {
        $lookup: {
          from: "orders", // The collection to join with
          localField: "_id", // The field from the `users` collection
          foreignField: "userId", // The field from the `orders` collection
          as: "orders", // The name of the resulting array field
        },
      },
    ]).toArray();

    res.status(200).json({
      status: "success",
      message: "Users with their orders retrieved successfully",
      data: usersWithOrders,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

// routers.get("/users/:name", (req, res) => {

//Endpoint 2
// routers.get("/users/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();
//   const user = users.find((u) => u.name.toLowerCase() === name);

//   if (!user) {
//     return res.status(404).json({ message: "Data user tidak ditemukan" });
//   }
//   res.json(user);
// });

// Endpoint 3
// routers.post("/users", (req, res) => {
//   if (Object.keys(req.body).length === 0) {
//     res.json({
//       message: "Masukkan data yang akan diubah",
//     });
//   } else {
//     // nama diubah menjadi titlecase
//     let name = req.params.name.toLowerCase();
//     let firstLetter = name.charAt(0).toUpperCase();
//     name = firstLetter + name.slice(1);
//     users.push({
//       id: Number(req.body.id),
//       name: name,
//     });
//     res.json(users);
//   }
// });

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
// routers.put("/users/:name", (req, res) => {
//   if (Object.keys(req.body).length === 0) {
//     res.json({
//       message: "Masukkan data yang akan diubah",
//     });
//   }
//   // nama diubah menjadi titlecase
//   let name = req.params.name.toLowerCase();
//   let firstLetter = name.charAt(0).toUpperCase();
//   name = firstLetter + name.slice(1);
//   // kirim data berdasark nama
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].name === name) {
//       users[i].name = req.body.name;
//       users[i].id = req.body.id;

//       res.json(users[i]);
//     }
//   }
//   // kirim pesan apabila data tidak ditemukan
//   res.json({
//     message: "Data user tidak ditemukan",
//   });
// });

// Endpoint 7
// routers.delete("/users/:name", (req, res) => {
//   // nama diubah menjadi titlecase
//   let name = req.params.name.toLowerCase();
//   let firstLetter = name.charAt(0).toUpperCase();
//   name = firstLetter + name.slice(1);

//   const itemToDelete = users.find((el) => el.name === name);
//   const index = users.indexOf(itemToDelete);

//   users.splice(index, 1);
//   res.json(users);
// });

module.exports = routers;