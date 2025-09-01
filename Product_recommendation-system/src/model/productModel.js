const db = require("../../db.js"); // Use CommonJS require as you're not using ES Modules here
// let db=require("../../db.js");

exports.getSubCategories = (req, res) => {
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

exports.addProduct=(name, description, price, category_id ,image,discount)=>{
      
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


exports.viewProducts = () => {
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

exports.deleteProduct= (product_id) => {
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


exports.updateProductPost = (pid, name, description, price, image_url, category_id, discount, stock_unit) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE products 
            SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?, discount = ?, stock_unit = ? 
            WHERE product_id = ?`;

        db.query(sql, [name, description, price, image_url, category_id, discount, stock_unit, pid], (err, result) => {
            if (err) {
                console.error("Error updating product:", err);
                reject(err);
            } else {
                console.log("Product updated successfully:", result);
                resolve(result);
            }
        });
    });
};


// addProduct_2
exports.addProduct_2 = (product_name, image, subcategory_id, brand, description, stock_unit, stock, price, discount, organic) => {
  return new Promise((resolve, reject) => {
    // Input validation (basic example)
    if (!product_name || !image || !subcategory_id || !brand || !stock_unit || stock < 0 || price < 0) {
      return reject(new Error("Invalid input data"));
    }
    const sql = `
      INSERT INTO products_2 (product_name, product_image, subcategory_id, brand, destcription, stock_unit, stock, price, discount, organic)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [product_name, image, subcategory_id, brand, description, stock_unit, stock, price, discount, organic], (err, result) => {
      if (err) {
        console.error("Error adding product:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};
