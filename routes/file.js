const Router = require("express").Router();
const {getFileById} = require("./methods/fileMethods")
Router.route("/:id").get(getFileById);


module.exports = Router;