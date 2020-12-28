const Admin = require("../../models/admin")
const bcrypt = require("bcrypt");
const {genToken} =require("../../utils/generateToken")
const jwt = require("jsonwebtoken");
exports.signup = async(req,res,next)=>{
const {email,username,password} = req.body;
try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const newUser = new Admin({email,username,password:hash});
    await newUser.save();
    const token  = await genToken(newUser._id)
    return res.status(200).send({
        message:"Success",
        newUser,token
    })
} catch (e) {
    next(e);
    
}
}
exports.login = async(req,res,next)=>{
    const {username,password} = req.body;
    let email = username;
    if(!email||!password){
        let e = new Error("Enter All Required Fields")
        e.status = 400;
        return next(e);
    }
    const admin = await Admin.findOne({email});
    if(!admin){
        let e = new Error("Incorrect Email/Password")
        e.status = 404;
        return next(e);  
    }
    try {
        const result =await bcrypt.compare(password,admin.password)
        if(!result){
            let e = new Error("Incorrect Email/Password")
            e.status = 404;
            return next(e);  
        }
        const token = await genToken(admin._id);
        res.status(200).send({
            message:"Success",
            name:admin.name,
            token
        })
        
    } catch (e) {
        next(e);
    }
    
}
exports.getuser = async(req,res,next)=>{
    try {
        console.log(req.headers)
        const token = req.headers["x-auth-token"].split(" ")[1];
        
        if(!token){
            console.log("Yes");
            let e = new Error("No Token Present")
            e.status = 401;
            return next(e);   
        }
        const id = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const admin = await Admin.findById(id.id).select("-password -role")
        res.status(200).send({
            message:"Success",
            admin
        })
    } catch (e) {
        console.log(e);
        return next(e);
    }
}