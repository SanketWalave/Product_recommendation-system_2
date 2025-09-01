
let usermodel=require("../models/usermodel.js");
//let bcrypt=require("bcryptjs");
exports.userIDpass=(req,res)=>{
      let {username,userEmail,password, created_at ,role}=req.body;
    console.log(username);
    console.log(userEmail);
    console.log(password);
    console.log(role);
    //let encformpass=bcrypt.hashSync(password,8);
    let promise=usermodel.saveUserIDpass(username,userEmail,password, created_at ,role);
    promise
    .then((result)=>{
        res.send("savemodel data...");
    }).catch((err)=>{
        res.send("error occer"+err);
    });
};

exports.deleteRole=(req,res)=>{
    let user_id=req.query.id;   
    console.log(user_id);
    
    let promise=usermodel.deleteRole(user_id);
    promise
    .then((result)=>{
        res.send("user deleted success..")
    }).catch((err)=>{
        res.send("userdata not delete"+err);
    })  
}
