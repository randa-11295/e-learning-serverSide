var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var { connectDB } = require("./db/dbConnect");
const { readdirSync } = require("fs");


var app = express();
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode" , process.env.PORT);
});
   
connectDB();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(404).json({err})
});

module.exports = app;
