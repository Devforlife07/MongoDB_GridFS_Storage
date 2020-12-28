const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
let gfs;
exports.connectDB = async()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const connection = await mongoose.connect(process.env.MONGO_URI,{
                useCreateIndex: true,
                useFindAndModify: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            let gfs;
            
            gfs = Grid(mongoose.connection.db,mongoose.mongo)
            gfs.collection("employee");
            
            console.log("MONGODB Connected");
            resolve();
            
            
        }
        catch(e){
            console.log(e)
            console.log("MongoDb Not Connected");
            reject();
            
        }


    })


    

}
exports.gfs = async()=>{
    const connection = await mongoose.connect(process.env.MONGO_URI,{
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    let gfs;
    
    gfs = Grid(mongoose.connection.db,mongoose.mongo)
    gfs.collection("employee");
    return gfs;

}