import express from 'express';
const router = express.Router();
import * as subCategoryController from "../controler/SubCatagoryControler.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";


router.get("/addSubCategoryGet",verifyToken, verifyAdmin,subCategoryController.addSubCategoryGet);
router.post('/addSubCategory',verifyToken, verifyAdmin, subCategoryController.addSubCategory);

router.get("/viewSubCategory",verifyToken, verifyAdmin, subCategoryController.viewSubCategory); 
router.get("/deleteSubCategoryById",verifyToken, verifyAdmin, subCategoryController.deleteSubCategoryById); 
router.get("/updateSubCategoryGetById",verifyToken, verifyAdmin, subCategoryController.updateSubCategoryGetById);
router.post("/updateSubCategoryPostById",verifyToken, verifyAdmin, subCategoryController.updateSubCategoryPost); 
router.get("/getProductBySubcategory",verifyToken, verifyAdmin,subCategoryController.getProductBySubcategory);
export default router;