exports.uploadBulkFile = async (req, res, next) => {
  try {
    // const GridFS = Grid(mongoose.connection.db, mongoose.mongo)
    //   console.log(req.file);
    //   var writestream = GridFS.createWriteStream({
    //     filename: req.file.originalname
    // });
    // writestream.on('close', function (file) {
    //   callback(null, file);
    // });
    // console.log(req.body.employee)
    res.status(200).send({
      file: req.file,
    });
  } catch (e) {
    // console.log("HERE ERROR IS CAUGHT")
    console.log(e);
    res.status(500).send({
      message: e.message,
    });
  }
};
