// const db = require("../../db.js"); // Use CommonJS require as you're not using ES Modules here
import db from "../../db.js"
import dotenv from "dotenv";
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
export const registerUser = (user_name, user_email, user_password, user_type) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO user VALUES (0, ?, ?, ?, ?)"; // 0 for auto-increment
        db.query(sql, [user_name, user_email, user_password, user_type], (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                reject(err);
            } else {
                console.log("User registered successfully:", result);
                resolve(result);
            }
        });
    });
};

// Delete User By ID
export const deleteUserbyEmailAnsPassword = (user_email,user_id) => {
    console.log("Delete called");
    console.log("user_email:", user_email);
    console.log("password:", user_id);
   return new Promise((resolve, reject) => {
    db.query("DELETE FROM user WHERE user_email = ?", [user_email], (err, result) => {
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

export const userLogin=(user_email,password) => {
    console.log("user login called");
    return new Promise((resolve, reject) => {
        db.query("select * FROM user WHERE user_email = ?",[user_email],(err,result)=>{
            if (err) {
                console.error("Error loging user:", err);
                reject("no user user: " + err);
            } else {
                console.log("login sucsessfull:", result);
                console.log(result);
                resolve(result); // e.g., { affectedRows: 1 }
            }
        });
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
export const updateAdminProfile = ( user_id, user_name, user_email) => {
    console.log(user_id+"     "+ user_name+"     "+user_email);
    return new Promise((resolve, reject) => {
        const sql = "UPDATE user SET user_name = ?, user_email = ? WHERE user_id = ?";
        db.query(sql, [ user_name, user_email,user_id], (err, result) => {
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
export const updateUserProfile = ( user_id, user_name, user_email) => {
    console.log(user_id+"     "+ user_name+"     "+user_email);
    return new Promise((resolve, reject) => {
        const sql = "UPDATE user SET user_name = ?, user_email = ? WHERE user_id = ?";
        db.query(sql, [ user_name, user_email,user_id], (err, result) => {
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
}
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
}
