import e from "express";
import * as subCatagory from "../model/SubCatagoryModel.js"; // adjust path
// import * as categoryModel from "../model/categoryModel.js"; // adjust path

export const addSubCategoryGet = (req, res) => {
  subCatagory
    .getCatagorys()
    .then((categories) => {
      console.log("Categories fetched successfully:", categories);
      res.render("addSubCategory", { categories }); // pass categories to EJS
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
      res.status(500).send("Error fetching categories");
    });
};

export const addSubCategory = (req, res) => {
  console.log("Request Body:", req.body);
  const { subcategory_name, category_id } = req.body;
  console.log(
    "Adding sub-category:",
    subcategory_name,
    "to category ID:",
    category_id
  );
  subCatagory
    .addSubCategory(subcategory_name, category_id)
    .then(() => res.send("Sub-category added successfully"))
    .catch((err) => res.status(500).send("Error adding sub-category"));
};

export const viewSubCategory = (req, res) => {
  console.log("Request Query:", req.query);
  const category_id=req.query.category_id;
  subCatagory
    .viewSubCategory(category_id)
    .then((subCategories) => {
      console.log("Sub-categories fetched successfully:", subCategories);
       res.status(200).json({
                success: true,
                data: subCategories
              });
      // res.render("viewSubCategory", { subCategories }); // Render the viewSubCategory page with subCategories
    })
    .catch((err) => {
      console.error("Error fetching sub-categories:", err);
      res.status(500).send("Error fetching sub-categories");
    });
};

export const deleteSubCategoryById = (req, res) => {
  const id = req.query.id; 
  console.log("Deleting sub-category with ID:", id);
  if (!id) {
    return res.status(400).send("Sub-category ID is required");
  }
  subCatagory.deleteSubCategoryById(id)
    .then(() => res.send("Sub-category deleted successfully"))
    .catch((err) => {
      console.error("Error deleting sub-category:", err);
      res.status(500).send("Error deleting sub-category");
    });
};

export const updateSubCategoryGetById = (req, res) => {
  const subCategoryId = req.query.id; 
  console.log("Updating sub-category with ID:", subCategoryId);
  if (!subCategoryId) {
    return res.status(400).send("Sub-category ID is required");
  }
  subCatagory.updateSubCategoryGetById(subCategoryId)
    .then((subCategories) => {
      console.log("Sub-category fetched for update:", subCategories);
      // const subCategory = subCategories.find(cat => cat.subcategory_id === parseInt(subCategoryId));
      // res.render("updateSubCategory", { subCategory }); // Render the updateSubCategory page with the subCategory details
    })
    .catch((err) => {
      console.error("Error fetching sub-category for update:", err);
      res.status(500).send("Error fetching sub-category for update");
    });
}

export const updateSubCategoryPost = (req, res) => {
  console.log("Request Body:", req.body);
  const { subcategory_id, subcategory_name } = req.body;
  console.log("Updating sub-category:", subcategory_name, "with ID:", subcategory_id);
  if (!subcategory_id) {
    return res.status(400).send("Sub-category ID is required");
  }
  subCatagory.updateSubCategoryPost(subcategory_id, subcategory_name )
    .then(()=>{
      res.status(200).json({
        success: true,
        message: "Sub-category updated successfully"
      });
    })
    .catch((err) => {
      console.error("Error updating sub-category:", err);
      res.status(500).send("Error updating sub-category");
    });
}

export const getProductBySubcategory=(req,res)=>{
  const subcategory_id=req.query.subcategory_id;
  console.log("Fetching products for subcategory ID:", subcategory_id);
  if (!subcategory_id) {
    return res.status(400).send("Sub-category ID is required");
  } 
  subCatagory.getProductBySubcategory(subcategory_id)
  .then((products) => {
    // console.log("Products fetched successfully:", products);
    res.status(200).json({
      success: true,
      data: products
    });
    // res.render("viewProducts", { products }); // Render the viewProducts page with products
  })
  .catch((err) => {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products");
  });
}
