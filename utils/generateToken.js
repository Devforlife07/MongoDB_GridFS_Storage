const jwt = require("jsonwebtoken");
exports.genToken=async(id)=>{
    return new Promise((resolve,reject)=>{
        console.log(id)
    const token = jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:'12h'
    })
    resolve(token);
    })

}