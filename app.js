const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv").config({
  path: "./config/.env",
});
const { connectDB } = require("./utils/db");
const connect = async () => await connectDB();
connect();

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use("/file", require("./routes/addFile"));
app.use("/auth", require("./routes/auth"));
app.use("/employee", require("./routes/employee"));
app.use("/bulkupload", require("./routes/bulkUpload"));
//Error Handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.status(err.status || 500).send({
      message: err.message,
    });
  } else next();
});
app.use(express.static(path.join(__dirname, "/build/")));

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Is Up On Port ${PORT}`);
});
