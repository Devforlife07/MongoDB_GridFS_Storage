  
const fs = require("fs"); 
let {gfs} = require("../../utils/db")
gfs=gfs().then(val=> gfs = val);
exports.addFile = async(req,res,next)=>{
  try{
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
        file: req.file
      })

  }
  catch(e){
    console.log(e);
    res.status(500).send({
      message:e.message
    })
  }
    
}
exports.getFileById = async(req,res,next)=>{
  let {id} = req.params;

  try {  
    // console.log(id);
    gfs.files.find({}).toArray((err,file)=>{
      console.log(file);
    let resfile = file.filter(val=>val._id==id);
    console.log(resfile)

    //   // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
     
        // Read output to browser
        if(resfile[0].contentType.includes("video"))
        res.header("type","video/mp4");
        if(resfile[0].contentType.includes("image"))
        res.header("type",resfile[0].contentType)
        else if(resfile[0].contentType=="application/octet-stream"){
          res.header("type","text/csv")
        } 
        else{
          res.header("type",resfile[0].contentType);
        }
        
        const readstream = gfs.createReadStream(resfile[0]);
        readstream.pipe(res);
      
      
  })} catch (err) {
      next(err);
  }
  
  }