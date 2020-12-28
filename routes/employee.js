const Router = require("express").Router();
const {addEmployee,getEmployees,getEmployee,deleteFiles}  = require("./methods/employeemethods")
Router.route("/add").post(addEmployee);
Router.route("/").get(getEmployees);
// Router.route("/files").get(getEmployee)
Router.route("/:id").get(getEmployee).delete(deleteFiles)

module.exports = Router;