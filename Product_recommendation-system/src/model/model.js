// const db = require("../../db.js"); // Use CommonJS require as you're not using ES Modules here
import db from "../../db.js";
import dotenv from "dotenv";
import e from "express";
dotenv.config();
import jwt from "jsonwebtoken";

//  getUserByTocken model
export const getUserByToken = (token) => {
  const trimmedToken = token.trim();
  const decodedToken = jwt.verify(trimmedToken, process.env.JWT_SECRET);

  return new Promise((resolve, reject) => {
    db.query(
      "SELECT user_id, user_name AS uname, user_email AS email, user_type AS urole FROM user WHERE user_email = ?",
      [decodedToken.email],
      (err, result) => {
        if (err) {
          console.error("Error fetching user:", err);
          reject("Error fetching user: " + err);
        } else {
          if (result.length > 0) {
            resolve(result);
          } else {
            resolve("no data");
          }
        }
      }
    );
  });
};
// Register User
export const registerUser = (
  user_name,
  user_email,
  user_password,
  user_type
) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO user VALUES (0, ?, ?, ?, ?)"; // 0 for auto-increment
    db.query(
      sql,
      [user_name, user_email, user_password, user_type],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          reject(err);
        } else {
          console.log("User registered successfully:", result);
          resolve(result);
        }
      }
    );
  });
};

// Delete User By ID
export const deleteUserbyEmailAnsPassword = (user_email, user_id) => {
  console.log("Delete called");
  console.log("user_email:", user_email);
  console.log("password:", user_id);
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM user WHERE user_email = ?",
      [user_email],
      (err, result) => {
        if (err) {
          console.error("Error deleting user:", err);
          reject("Error deleting user: " + err);
        } else {
          if (result.affectedRows > 0) {
            resolve(result);
          } else {
            resolve("no data"); // 👈 handled in controller
          }
        }
      }
    );
  });
};

export const userLogin = (user_email, password) => {
  console.log("user login called");
  return new Promise((resolve, reject) => {
    db.query(
      "select * FROM user WHERE user_email = ?",
      [user_email],
      (err, result) => {
        if (err) {
          console.error("Error loging user:", err);
          reject("no user user: " + err);
        } else {
          console.log("login sucsessfull:", result);
          console.log(result);
          resolve(result); // e.g., { affectedRows: 1 }
        }
      }
    );
  });
};

// exports.updateAdminProfile = (user_id, user_name, user_email) => {
//     console.log(user_id+"     "+ user_name+"     "+user_email);
//     return new Promise((resolve, reject) => {
//         const sql = "UPDATE user SET user_name = ?, user_email = ? WHERE user_id = ?";
//         db.query(sql, [user_name, user_email, user_id], (err, result) => {
//             if (err) {
//                 console.error("Error updating user:", err);
//                 reject(err);
//             } else {
//                 console.log("User updated successfully:", result);
//                 resolve(result);
//             }
//         });
//     });
// };

// Inside your model.js (or whatever model file)
export const updateAdminProfile = (user_id, user_name, user_email) => {
  console.log(user_id + "     " + user_name + "     " + user_email);
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE user SET user_name = ?, user_email = ? WHERE user_id = ?";
    db.query(sql, [user_name, user_email, user_id], (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        reject(err);
      } else {
        console.log("User updated successfully:", result);
        resolve(result);
      }
    });
  });
};
export const updateUserProfile = (user_id, user_name, user_email) => {
  console.log(user_id + "     " + user_name + "     " + user_email);
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE user SET user_name = ?, user_email = ? WHERE user_id = ?";
    db.query(sql, [user_name, user_email, user_id], (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        reject(err);
      } else {
        console.log("User updated successfully:", result);
        resolve(result);
      }
    });
  });
};

export const viewUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user where user_type='user'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        reject(err);
      } else {
        console.log("Users fetched successfully:", result);
        resolve(result);
      }
    });
  });
};
export const viewAdmin = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user where user_type='admin'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        reject(err);
      } else {
        console.log("Users fetched successfully:", result);
        resolve(result);
      }
    });
  });
};

export const deleteUserById = (user_id) => {
  console.log("Delete called");
  console.log("user_id:", user_id);
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM user WHERE user_id = ?", [user_id], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        reject("Error deleting user: " + err);
      } else {
        if (result.affectedRows > 0) {
          resolve(result);
        } else {
          resolve("no data"); // 👈 handled in controller
        }
      }
    });
  });
};

export const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
    p.*, 
    u.user_name, 
    u.user_email, 
    o.order_id, 
    o.order_date, 
    o.status, 
    o.total,
    oi.quantity, 
    oi.price
FROM products_2 p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
JOIN user u ON o.user_id = u.user_id

`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching orders:", err);
        reject(err);
      } else {
        // console.log("Orders fetched successfully:", result);
        resolve(result);
      }
    });
  });
};

export const editOrderStatus = (order_id, status) => {
//   console.log("Edit Order Status called");
//   console.log("order_id:", order_id);
//   console.log("status:", status);
    return new Promise((resolve, reject) => {
    const sql = "UPDATE orders SET status = ? WHERE order_id = ?";
    db.query(sql, [status, order_id], (err, result) => {
      if (err) {
        console.error("Error updating order status:", err);
        reject("Error updating order status: " + err);
      } else {
        console.log("Order status updated successfully:", result);
        resolve(result);
      }
    });
  });
}

export const updatePassword = (user_email, new_password) => {
    console.log("Update Password called");
    console.log("user_email:", user_email);
    console.log("new_password:", new_password);
    return new Promise((resolve, reject) => {
        const sql = "UPDATE user SET password = ? WHERE user_email = ?";
        db.query(sql, [new_password, user_email], (err, result) => {
            if (err) {
                console.error("Error updating password:", err);
                reject("Error updating password: " + err);
            } else {
                console.log("Password updated successfully:", result);
                resolve(result);
            }
        });
    });
}
  export const getUserByMail = (user_email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE user_email = ?";
        db.query(sql, [user_email], (err, result) => {
            if (err) {
                console.error("Error fetching user by email:", err);
                reject("Error fetching user by email: " + err);
            } else {    
                console.log("User fetched successfully by email:", result);
                resolve(result);
            }   
        });
    });
}
