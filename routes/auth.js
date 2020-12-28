const Router = require("express").Router();
const {signup,login,getuser} = require("./methods/authMethods")
Router.route("/signup").post(signup);
Router.route("/login").post(login);
Router.route("/getuser").get(getuser);

module.exports = Router;