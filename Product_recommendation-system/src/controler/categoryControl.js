import e from "express";
import * as categoryModel from "../model/categoryModel.js"; // adjust path



export const addCatagoryPost = (req, res) => {
    console.log("Request Body:", req.body);
    const { category_name, description } = req.body;

    categoryModel.addCatagoryPost(category_name, description)
        .then(() => res.send("Category added successfully"))
        .catch(err => res.status(500).send("Error adding category"));
};
  

export const viewCatagory = (req, res) => {
    categoryModel.viewCatagory()
        .then(categories => {
            console.log("Categories fetched successfully:", categories);
            // console.log("Categories fetched successfully:", categories);
            // res.render("viewCatagory", { categories }); // Render the viewCatagory page with categories
        })
        .catch(err => {
            console.error("Error fetching categories:", err);
            res.status(500).send("Error fetching categories");
        });
}

export const deleteCatagoryById = (req, res) => {
    const categoryId = req.query.id; // Assuming the ID is passed as a query parameter
    console.log("Deleting category with ID:", categoryId);

    if (!categoryId) {
        return res.status(400).send("Category ID is required");
    }

    categoryModel.deleteCatagoryById(categoryId)
        .then(() => res.send("Category deleted successfully"))
        .catch(err => {
            console.error("Error deleting category:", err);
            res.status(500).send("Error deleting category");
        });
}

export const updateCatagoryGetById = (req, res) => {
    const categoryId = req.query.id; // Assuming the ID is passed as a query parameter
    console.log("Updating category with ID:", categoryId);

    if (!categoryId) {
        return res.status(400).send("Category ID is required");
    }

    // Fetch the category details to pre-fill the form
    categoryModel.updateCatagoryGetById(categoryId)
        .then(categories => {
            console.log("Categories fetched for update:", categories);
            // const category = categories.find(cat => cat.category_id === parseInt(categoryId));
            //res.render("updateCatagory", { category }); // Render the updateCatagory page with the category details
        })
        .catch(err => {
            console.error("Error fetching categories for update:", err);
            res.status(500).send("Error fetching categories for update");
        });
}

export const updateCatagoryPost = (req, res) => {
    const { category_id, category_name, description } = req.body;
    console.log("Updating category with ID:", category_id);

    if (!category_id || !category_name || !description) {
        return res.status(400).send("All fields are required");
    }

    categoryModel.updateCatagoryPost(category_id, category_name, description)
        .then(() => res.send("Category updated successfully"))
        .catch(err => {
            console.error("Error updating category:", err);
            res.status(500).send("Error updating category");
        });
}
