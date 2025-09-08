// import express from "express";
// import multer from "multer"; // <-- Add this line

// const router = express.Router();
// import * as controller from "../controler/controler.js";
// import e from "express";

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // ...existing routes...
// router.get("/",controller.homePage);

// // router.get("/userlogin", (req, res) => {
// //   res.render("login", { message: null, success: false });
// // });
// router.post("/userlogin",controller.userLogin)

// // Register a user
// // Show registration form
// router.get("/registerUser", (req, res) => {
//   res.render("register"); // make sure you have register.ejs
// });
// router.post("/registerUser", controller.registerUser);
// router.get("/getUserByToken",controller.getUserByToken);

// //delete user
// router.get("/deleteuserbyEmailAnsPassword",controller.deleteUserbyEmailAnsPassword);
// router.get("/updateUserInfo",controller.updateUserInfo);


// //adminProfile

// router.get("/adminProfile",controller.adminProfile);

// //editAdminProfile

// router.get("/editAdminProfile",controller.editAdminProfile);
// router.post("/updateAdminProfile",controller.updateAdminProfile);



// //viewUsers
// router.get("/viewUsers",controller.viewUsers);


// // Register a admin
// // Show registration form
// router.get("/registerAdmin", (req, res) => {
//   res.render("registerAdmin"); // make sure you have register.ejs
// });
// router.post("/registerAdmin", controller.registerAdmin);

// //viewAdmin
// router.get("/viewAdmin",controller.viewAdmin);


// export default router;


import express from "express";
import multer from "multer";
import * as controller from "../controler/controler.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
router.get("/", controller.homePage);

// done 
router.post("/userlogin", controller.userLogin);   
// done
router.post("/registerUser", controller.registerUser);

router.post("/updatePassword", controller.updatePassword);  //done
//done
router.post("/registerAdmin",verifyToken, verifyAdmin, controller.registerAdmin);

// ✅ Protected routes done
router.get("/getUserByToken", verifyToken, controller.getUserByToken);
// done but password varification problem 
router.post("/deleteuserbyEmailAnsPassword", verifyToken, verifyAdmin,controller.deleteUserbyEmailAnsPassword);
// done 
router.get("/updateUserInfo", verifyToken, verifyAdmin, controller.updateUserInfo);

// router.get("/adminProfile", verifyToken, verifyAdmin, controller.adminProfile);
// router.get("/editAdminProfile", verifyToken, verifyAdmin, controller.editAdminProfile);
router.post("/deleteUserById", verifyToken, verifyAdmin, controller.deleteUserById);
// done 
router.post("/updateAdminProfile", verifyToken, verifyAdmin, controller.updateAdminProfile);
// done 
router.post("/updateUserProfile", verifyToken, verifyAdmin, controller.updateUserProfile);
// verifyToken, verifyAdmin,
// done
router.get("/viewUsers", verifyToken, verifyAdmin, controller.viewUsers);
// done   
router.get("/viewAdmin", verifyToken, verifyAdmin, controller.viewAdmin);
router.get("/getAllOrders",verifyToken, verifyAdmin,   controller.getAllOrders);
router.post("/editOrderStatus",verifyToken, verifyAdmin, controller.editOrderStatus);

export default router;

