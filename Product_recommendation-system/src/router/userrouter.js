let express=require("express");
let usercontrol=require("../controllers/usercontrol.js");
// let usermodel=require("../models/usermodel.js");
let userRouter=express.Router();


userRouter.get("/login",usercontrol.userIDpass);
userRouter.get("/deteUser",usercontrol.deleteRole);

// userRouter.get('/dashboard', authenticateToken, (req, res) => {
//     res.send(`Welcome, ${req.user.username}`);
// });

//login page


// const jwt = require('jsonwebtoken');

// const user = { id: 1, username: "admin" };
// const secretKey = "your_secret_key";

// // Generate token
// const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

// console.log("JWT:", token);


module.exports=userRouter;