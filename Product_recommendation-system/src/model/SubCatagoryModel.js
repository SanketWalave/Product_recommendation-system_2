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


exports.viewSubCategory = (category_id) => {   
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM subcategory where category_id=?";
        db.query(sql,[category_id], (err, results) => {
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

exports.deleteSubCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM subcategory WHERE subcategory_id = ?";
        db.query(sql, [id], (err, result) => {
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

exports.updateSubCategoryPost = (subcategory_id, subcategory_name ) => {
    console.log(subcategory_id+"     "+ subcategory_name);
    return new Promise((resolve, reject) => {
        // const sql = "UPDATE subcategory SET subcategory_name = ? WHERE subcategory_id = ?";
        // const sql = "UPDATE subcategory SET subcategory_name = ? WHERE subcategory_id = ?";
        const sql = "UPDATE subcategory SET subcategory_name = ? WHERE subcategory_id = ?";

        db.query(sql, [subcategory_name,subcategory_id ], (err, result) => {
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

exports.getProductBySubcategory = (subcategory_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM products_2 WHERE subcategory_id = ?";
        db.query(sql, [subcategory_id], (err, results) => {
            if (err) {
                console.error("Error fetching products by sub-category:", err);
                reject(err);
            } else {
                console.log("Products fetched successfully by sub-category:", results);
                resolve(results);
            }   
        });
    });
}
