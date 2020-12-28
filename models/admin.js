const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    username:{
        type: String,
        required: [true,"Name Is Required"]
    },
    email:{
        type: String,
        unique: [true,"Email Should Be Unique"],
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default:"Admin",
        enum:["Admin","Employee"]
    }
})
adminSchema.post("save",(err,doc,next)=>{
    console.log(err.code);
    if(err){
        const {errors} = err;
        if(errors&&errors.name){
            const {name:e} = errors;
            if(e.kind == "required"){
                let error = new Error(e);
                error.status = 400;
                next(error);
            }
        }

    }
    if(err.name=="MongoError" && err.code==11000){
        console.log(err)
        let error = new Error("Already Registered");
                error.status = 400;
                next(error);
    }
})
module.exports = mongoose.model("Admin",adminSchema);