const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const Storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
       if(!file.originalname.includes(req.params.id)){
            return;
          }
          
        return new Promise((resolve, reject) => {
          const filename = req.params.id + path.extname(file.originalname)
          const fileInfo = {
            filename: filename,
            bucketName: 'employee'
          };
          console.log(fileInfo)
          resolve(fileInfo);
      });
    }
  });
module.exports = Storage;