// const db = require("../../db.js"); // Use CommonJS require as you're not using ES Modules here
// let db=require("../../db.js");

import db from "../../db.js"

export const getSubCategories = (req, res) => {
 return new Promise((resolve, reject) => {
    const sql = "SELECT subcategory_id,subcategory_name FROM subcategory where subcategory_name IS NOT NULL AND subcategory_name != '' ";
    db.query(sql, (err, results) => { 
      if (err) {
        console.error("Error fetching subcategories:", err);
        reject(err);
      } else {
        // console.log("Subcategories fetched successfully:", results);
        // res.render('addProduct_2', { subcategories: results });
        resolve(results);
      }
        });
    });  
  }

export const addProduct=(name, description, price, category_id ,image,discount)=>{
      
    return new Promise((resolve, reject) => {
        const sql = "insert into products values ('0',?,?,?,?,?,?)";
        db.query(sql, [name, description, price,  image,category_id,discount], (err, result) => {
            if (err) {
                console.error("Error updating user:", err);
                reject(err);
            } else {
                console.log("product added successfully:", result);
                resolve(result);
            }
        });
    });  
};


export const viewProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products_2";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching products:", err);
        reject(err);
      } else {
        console.log("Products fetched successfully:");
        resolve(result);
      }
    });
  });
};

export const deleteProduct= (product_id) => {
    console.log("delete product called with id:", product_id);
    return new Promise((resolve, reject) => {
        const sql = "delete  FROM products_2 WHERE product_id  = ?";
        db.query(sql, [product_id], (err, result) => {
            if (err) {
                console.error("Error fetching product:", err);
                reject(err);
            } else {
                console.log("Product fetched successfully:", result);
                resolve(result);
            }
        });
    });
}


export const updateProductPost = (
  product_id,
  product_name,
  product_image,
  subcategory_id,
  brand,
  destcription,
  stock_unit,
  stock,
  price,
  discount,
  organic
) => {
  return new Promise((resolve, reject) => {
    // Base SQL
    let sql = `
      UPDATE products_2
      SET 
        product_name = ?,
        subcategory_id = ?,
        brand = ?,
        destcription = ?,
        stock_unit = ?,
        stock = ?,
        price = ?,
        discount = ?,
        organic = ?,
        updated_at = CURRENT_TIMESTAMP
    `;
    
    const values = [
      product_name,
      subcategory_id,
      brand,
      destcription,
      stock_unit,
      stock,
      price,
      discount,
      organic
    ];

    // ✅ Only update image if new one provided
    if (product_image !== undefined) {
      sql += `, product_image = ?`;
      values.push(product_image);
    }

    sql += ` WHERE product_id = ?`;
    values.push(product_id);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        return reject(err);
      }
      console.log("Product updated successfully:", result);
      resolve(result);
    });
  });
};




export const getProductDetailsById=(product_id)=>{
    return new Promise((resolve, reject) => {
   const sql = `
      select * from  products_2 where product_id=?
    `;
    db.query(sql, [product_id], (err, result) => {
     if (err) {
        console.error("Error finding product:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};
