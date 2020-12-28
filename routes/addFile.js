const Router = require("express").Router();
const {addFile,getFileById} = require("./methods/addFileMethods");
const multer = require("multer");
const Storage = require("../utils/gridfsStorage");
Router.route("/:id").post(multer({
storage:Storage
}).any(),addFile).get(getFileById);
module.exports = Router;