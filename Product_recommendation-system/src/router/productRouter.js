// import express from "express";
// import multer from "multer"; // <-- Add this line

// const router = express.Router();
// import * as productcontroler from "../controler/productControl.js";

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

// router.get("/viewProducts",productcontroler.viewProducts);

// router.get("/getSubCategoriesNameId",productcontroler.getSubCategories);


// router.post("/addProduct_2", upload.single('product_image'), productcontroler.addProduct_2);


// //deleteProduct
// router.get("/deleteProduct",productcontroler.deleteProduct);


// //updateProduct
// router.get("/updateProduct",productcontroler.updateProduct);
// router.post("/updateProduct", upload.single('productImage'), productcontroler.updateProductPost);


// export default router;


import express from "express";
import multer from "multer";
import * as productcontroler from "../controler/productControl.js";
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

// 🟢 Public routes
router.get("/viewProducts",  productcontroler.viewProducts);
router.get("/getSubCategoriesNameId", productcontroler.getSubCategories);

// 🔒 Protected routes (login required)
router.post(
  "/addProduct_2",
  verifyToken,        // user must be logged in
  verifyAdmin,        // user must also be admin
  upload.single("product_image"),
  productcontroler.addProduct_2
);

router.get(
  "/deleteProduct",
 
  productcontroler.deleteProduct
);

router.get(
  "/updateProduct",
  verifyToken,
  verifyAdmin,
  productcontroler.updateProduct
);

router.post(
  "/updateProduct",
  verifyToken,
  verifyAdmin,
  upload.single("productImage"),
  productcontroler.updateProductPost
);

export default router;
