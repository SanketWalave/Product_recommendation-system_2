const e = require("express");
let db=require("../../db.js");


exports.addCatagoryPost = (category_name, description) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO categories (category_name, description) VALUES (?, ?)";
        db.query(sql, [category_name, description], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


exports.viewCatagory = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM categories";
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

exports.deleteCatagoryById = (categoryId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM categories WHERE category_id = ?";
        db.query(sql, [categoryId], (err, result) => {
            if (err) {
                console.error("Error deleting category:", err);
                reject(err);
            } else {
                console.log("Category deleted successfully:", result);
                resolve(result);
            }
        });
    });
}

exports.updateCatagoryGetById = (categoryId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM categories WHERE category_id = ?";
        db.query(sql, [categoryId], (err, results) => {
            if (err) {
                console.error("Error fetching category for update:", err);
                reject(err);
            } else {
                console.log("Category fetched for update:", results);
                resolve(results);
            }
        });
    });
}

exports.updateCatagoryPost = (categoryId, category_name, description) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE categories SET category_name = ?, description = ? WHERE category_id = ?";
        db.query(sql, [category_name, description, categoryId], (err, result) => {
            if (err) {
                console.error("Error updating category:", err);
                reject(err);
            } else {
                console.log("Category updated successfully:", result);
                resolve(result);
            }
        });
    });
}