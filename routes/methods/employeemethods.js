const Employee = require("../../models/employee");
let { gfs } = require("../../utils/db");
gfs = gfs().then((val) => (gfs = val));

exports.addEmployee = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name) {
      let err = new Error("Please Enter the name of employee");
      err.status = 400;
      return next(err);
    }
    const newEmployee = new Employee({
      name,
      email,
    });
    newEmployee.save();
    return res.status(200).send({
      message: "Saved Successfully",
    });
  } catch (e) {
    next(e);
  }
};
exports.getEmployees = async (req, res, next) => {
  try {
    const allEmployees = await Employee.find({});
    res.status(200).send({
      message: "Success",
      allEmployees,
    });
  } catch (e) {
    return next(e);
  }
};
exports.getEmployee = async (req, res, next) => {
  let { id } = req.params;
  try {
    let employee = await Employee.findById(id).select("-role -__v");
    gfs.files.find().toArray((err, files) => {
      // const readstream = gfs.createReadStream(file.filename);
      //  readstream.pipe(res);
      files = files.filter((file) => file.filename.includes(id));
      res.status(200).send({
        message: "Success",
        employee,
        files,
      });
    });
  } catch (e) {
    if (e.kind == "ObjectId") {
      let err = new Error("Invalid Id");
      err.status = 404;
      return next(err);
    }
    next(e);
  }
};
exports.deleteFiles = async (req, res, next) => {
  // console.log("delete")
  try {
    gfs.remove({ _id: req.params.id, root: "employee" }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      console.log("Deleted");
      return res.status(200).send({
        message: "Success",
      });
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
