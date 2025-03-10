const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")

// const errorhandler = require("errorhandler");
const app = express();
const routers = require("./routers")
const path = require("path");


//Middleware
const log = (req, res, next) => {
  console.log(
    moment().format("h:mm:ss a") + " " + req.originalUrl + " " + req.ip
  );
  next();
};
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("tiny"));
// app.use(errorhandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
  origin : 'http://127.0.0.1:5501',
  methods : ["GET", "PUT"]
}))

//Routing
app.use(routers);

//Middleware untuk 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);