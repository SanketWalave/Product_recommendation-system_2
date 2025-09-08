import e from "express";
import db from "../../db.js";

export const addToCart = (user_id, product_id, quantity) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
    db.query(query, [user_id, product_id, quantity], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getCatagory = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM categories";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getSubCatagory = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM subcategory";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const getProducts = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products_2";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const addViewAction = (user_id, product_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO user_interactions (user_id, product_id, action_id)
      VALUES (?, ?, ?)
    `;

    db.query(query, [user_id, product_id, 1], (err, results) => {
      if (err) {
        console.error("Error inserting view action:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getViewAction = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM products_2 p
JOIN user_interactions ui ON p.product_id = ui.product_id
WHERE ui.user_id = ? AND ui.action_id = 1

    `;
    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error("Error fetching view actions:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const deleteViewAction = (user_id, product_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM user_interactions 
      WHERE user_id = ? AND product_id = ? AND action_id = 1
    `;

    db.query(query, [user_id, product_id], (err, results) => {
      if (err) {
        console.error("Error deleting view action:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const addAddToCartAction = (user_id, product_id) => {
  console.log("in addAddToCartAction model");
  return new Promise((resolve, reject) => {
    const query = `
        INSERT INTO user_interactions (user_id, product_id, action_id)
        VALUES (?, ?, ?)
      `;
    db.query(query, [user_id, product_id, 2], (err, results) => {
      if (err) {
        console.error("Error inserting add to cart action:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const deleteAddToCartAction = (user_id, product_id) => {
  return new Promise((resolve, reject) => {
    const query = `
        DELETE FROM user_interactions 
        WHERE user_id = ? AND product_id = ? AND action_id = 2
      `;
    db.query(query, [user_id, product_id], (err, results) => {
      if (err) {
        console.error("Error deleting add to cart action:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

export const addPurchaseAction = (user_id, product_id) => {
  return new Promise((resolve, reject) => {
    const query = `
            INSERT INTO user_interactions (user_id, product_id, action_id)
            VALUES (?, ?, ?)
            `;
    db.query(query, [user_id, product_id, 3], (err, results) => {
      if (err) {
        console.error("Error inserting purchase action:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const getRecommendations = (user_id) => {
  console.log("user_id in model:", user_id);
  return new Promise((resolve, reject) => {
    const query = `
      -- Step 1: get user's top subcategories based on weighted interactions
      WITH top_subcategories AS (
        SELECT 
            p.subcategory_id,
            SUM(
              CASE 
                WHEN ui.action_id = 3 THEN 5   -- purchased
                WHEN ui.action_id = 2 THEN 3   -- added_to_cart
                WHEN ui.action_id = 1 THEN 1   -- viewed
                ELSE 0
              END
            ) AS score
        FROM user_interactions ui
        JOIN products_2 p ON ui.product_id = p.product_id
        WHERE ui.user_id = ?
        GROUP BY p.subcategory_id
        ORDER BY score DESC
        LIMIT 3   -- pick top 3 subcategories
      )
      
      -- Step 2: recommend products from those subcategories
      SELECT 
          p.product_id,
          p.product_name,
          p.product_image,
          p.brand,
          p.price,
          p.discount,
          p.stock,
          s.subcategory_name,
          c.category_name
      FROM products_2 p
      JOIN subcategory s ON p.subcategory_id = s.subcategory_id
      JOIN categories c ON s.category_id = c.category_id
      WHERE p.subcategory_id IN (SELECT subcategory_id FROM top_subcategories)
      ORDER BY p.discount DESC, p.price ASC   -- prioritize discounted products
      LIMIT 15;
    `;

    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error("❌ Error fetching recommendations:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const addOrder = (user_id, total_amount) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO orders (user_id, status, total) VALUES (?, ?, ?)";
    db.query(query, [user_id, "pending", total_amount], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const addOrderItems = (order_id, product_id, quantity, price) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
    db.query(query, [order_id, product_id, quantity, price], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getReletedProducts = (product_id) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT p2.*
        FROM products_2 p1
        JOIN products_2 p2 ON p1.subcategory_id = p2.subcategory_id AND p1.product_id != p2.product_id
        WHERE p1.product_id = ?
        LIMIT 10
    `;
    db.query(query, [product_id], (err, results) => {
      if (err) {
        console.error("Error fetching related products:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const getProductById = (product_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products_2 WHERE product_id = ?";
    db.query(query, [product_id], (err, results) => {
      if (err) {
        console.error("Error fetching product by ID:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const getCartItems = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT p.*, c.quantity
        FROM cart c
        JOIN products_2 p ON c.product_id = p.product_id
        WHERE c.user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error("Error fetching cart items:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const removeCartItem = (user_id, product_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
    db.query(query, [user_id, product_id], (err, results) => {
      if (err) {
        console.error("Error removing cart item:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const updateCartItem = (user_id, product_id, quantity) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
    db.query(query, [quantity, user_id, product_id], (err, results) => {
      if (err) {
        console.error("Error updating cart item:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getOrderDetails = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
       SELECT 
    o.order_id, 
    o.status, 
    o.total, 
    o.order_date,
    oi.product_id, 
    oi.quantity, 
    oi.price,
    p.product_name, 
    p.destcription
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products_2 p ON oi.product_id = p.product_id
WHERE o.user_id = ?
ORDER BY o.order_date DESC;

    `;
    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error("Error fetching order details:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const deleteOrderById = (order_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM orders WHERE order_id = ?";
    db.query(query, [order_id], (err, results) => {
      if (err) {
        console.error("Error deleting order by ID:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
export const getBstOffers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products_2 order by discount desc ";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching best offers:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const editUser=(user_id, user_name, user_email) => {
  console.log("user model called");
    return new Promise((resolve, reject) => {
        const sql = "update user set user_name=?, user_email=? where user_id=?";
        db.query(sql, [user_name, user_email, user_id], (err, result) => {
            if (err) {
                console.error("Error updating user:", err);
                reject(err);
            }
            else {
                console.log("user updated successfully:", result);
                resolve(result);
            }
        });  
    });
}// Get user by ID (fix the query)
export const getUserById = (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE user_id = ?";
    db.query(sql, [user_id], (err, result) => {
      if (err) {
        console.error("Error fetching user by ID:", err);
        reject(err);
      } else {
        console.log("User fetched successfully by ID:", result);
        resolve(result);
      }
    });
  });
};

// Update password by user_id (not email anymore)
export const updateUserPassword = (user_id, new_password) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE user SET password = ? WHERE user_id = ?";
    db.query(sql, [new_password, user_id], (err, result) => {
      if (err) {
        console.error("Error updating password by ID:", err);
        reject(err);
      } else {
        console.log("Password updated successfully by ID:", result);
        resolve(result);
      }
    });
  });
};

          

