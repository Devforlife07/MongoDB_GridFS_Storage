const Router = require("express").Router();
const multer = require("multer");
const Storage = require("../utils/gridFsStorageBulk");
const {uploadBulkFile} = require("./methods/bulkUploadMethods")
Router.route("/").post(multer({storage:Storage}).any(),uploadBulkFile);

module.exports = Router;