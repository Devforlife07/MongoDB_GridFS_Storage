const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const employee = require("../models/employee");
const filterfn = (array, string) => {
  let temp = array.filter((val) => {
    if (string.includes(val._id)) return true;
    return false;
  });
  return temp.length >= 1 ? true : false;
};
const Storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: async (req, file) => {
    let allEmployees = [];
    let temp = await employee.find({});
    allEmployees = [...temp];
    //  console.log(filterfn(allEmployees))
    if (!filterfn(allEmployees, file.originalname)) {
      return;
    }

    return new Promise((resolve, reject) => {
      const filename = file.originalname + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: "employee",
      };
      console.log(fileInfo);
      resolve(fileInfo);
    });
  },
});
module.exports = Storage;
