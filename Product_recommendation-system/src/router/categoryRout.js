import express from "express";

const router = express.Router();
import * as catagoryControler from "../controler/categoryControl.js";



router.get("/addCatagory", (req, res) => {
  res.render("addCatagory"); // Render the addCatagory page
});
router.post("/addCategoryPost", catagoryControler.addCatagoryPost);
router.get("/viewCatagory",catagoryControler.viewCatagory);

router.get("/deleteCatagoryById",catagoryControler.deleteCatagoryById); 

router.get("/updateCatagoryGetById",catagoryControler.updateCatagoryGetById);
router.post("/updateCatagoryPost", catagoryControler.updateCatagoryPost); // Assuming you have a function to handle the update post request


export default router;