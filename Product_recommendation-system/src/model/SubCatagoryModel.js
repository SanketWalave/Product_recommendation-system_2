const e = require("express");
const db=require("../../db.js");

exports.addSubCategory = ( subcategory_name, category_id) => {
    console.log("Adding sub-category: in model", subcategory_name, "to category ID:", category_id);
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO subcategory ( subcategory_name, category_id) VALUES ( ?, ?)";
        db.query(sql, [ subcategory_name, category_id], (err, result) => {
            if (err) {
                console.error("Error adding sub-category:", err);
                reject(err);
            } else {
                console.log("Sub-category added successfully:", result);
                resolve(result);
            }
        }); 
    });
}

exports.getCatagorys = () => {
  return new Promise((resolve, reject) => {
    // ❌ wrong: FROM catagories
    // const query = "SELECT category_id, category_name FROM catagories";

    // ✅ correct spelling:
    const query = "SELECT category_id, category_name FROM categories";

    db.query(query, (err, results) => {
      if (err){ return reject(err);
      }else{
      resolve(results);
        console.log("Categories fetched successfully:", results);
      }
    });
  });
};


exports.viewSubCategory = () => {   
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM subcategory";
        db.query(sql, (err, results) => {
            if (err) {
                console.error("Error fetching sub-categories:", err);
                reject(err);
            } else {
                console.log("Sub-categories fetched successfully:", results);
                resolve(results);
            }
        });
    });
}

exports.deleteSubCategoryById = (subCategoryId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM subcategory WHERE subcategory_id = ?";
        db.query(sql, [subCategoryId], (err, result) => {
            if (err) {
                console.error("Error deleting sub-category:", err);
                reject(err);
            } else {
                console.log("Sub-category deleted successfully:", result);
                resolve(result);
            }
        });
    });
}

exports.updateSubCategoryGetById = (subCategoryId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM subcategory WHERE subcategory_id = ?";
        db.query(sql, [subCategoryId], (err, results) => {
            if (err) {
                console.error("Error fetching sub-category for update:", err);
                reject(err);
            } else {
                console.log("Sub-category fetched for update:", results);
                resolve(results);
            }
        });
    });
}

exports.updateSubCategoryPost = (subCategoryId, subCategoryName,catagoryId) => {
    console.log("Updating sub-category with ID:", subCategoryId, "to name:", subCategoryName, "and category ID:", catagoryId);
    return new Promise((resolve, reject) => {
        const sql = "UPDATE subcategory SET subcategory_name = ?,category_id=? WHERE subcategory_id = ?";
        db.query(sql, [subCategoryName,catagoryId, subCategoryId], (err, result) => {
            if (err) {
                console.error("Error updating sub-category:", err);
                reject(err);
            } else {
                console.log("Sub-category updated successfully:", result);
                resolve(result);
            }
        });
    });
}
