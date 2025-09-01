import express from 'express';
const router = express.Router();
import * as subCategoryController from "../controler/SubCatagoryControler.js";


router.get("/addSubCategoryGet",subCategoryController.addSubCategoryGet);
router.post('/addSubCategory', subCategoryController.addSubCategory);

router.get("/viewSubCategory", subCategoryController.viewSubCategory); 
router.get("/deleteSubCategoryById", subCategoryController.deleteSubCategoryById); 
router.get("/updateSubCategoryGetById", subCategoryController.updateSubCategoryGetById);
router.post("/updateSubCategoryPost", subCategoryController.updateSubCategoryPost); 
export default router;