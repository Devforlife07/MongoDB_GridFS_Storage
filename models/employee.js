const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    name:{
        type: String,
        required: [true,"Name Is Required"]
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default:"Employee",
        enum:["Admin","Employee"]
    }
})
module.exports = mongoose.model("Employee",employeeSchema);