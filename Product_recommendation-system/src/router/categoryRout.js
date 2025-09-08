import express from "express";

const router = express.Router();
import * as catagoryControler from "../controler/categoryControl.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";



router.get("/addCatagory", (req, res) => {
  res.render("addCatagory"); // Render the addCatagory page
});
router.post("/addCategoryPost",verifyToken, verifyAdmin, catagoryControler.addCatagoryPost);
router.get("/viewCatagory",verifyToken, verifyAdmin,catagoryControler.viewCatagory);

router.get("/deleteCatagoryById",verifyToken, verifyAdmin,catagoryControler.deleteCatagoryById); 

router.get("/updateCatagoryGetById",verifyToken, verifyAdmin,catagoryControler.updateCatagoryGetById);
router.post("/updateCatagoryPostById",verifyToken, verifyAdmin, catagoryControler.updateCatagoryPostById); // Assuming you have a function to handle the update post request


export default router;