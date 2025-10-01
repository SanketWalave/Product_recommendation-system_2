// File: src/controler/controler.js
import express from "express";
import bcrypt from "bcrypt";
import * as model from "../model/model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// =====================
// Home Page
// =====================
export const homePage = (req, res) => {
  res.render("home.ejs");
};

// =====================
// User Login
// =====================
export const userLogin = (req, res) => {
  const { email, password } = req.body;

  model.userLogin(email)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];
      console.log("User found:", user);

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const payloadUser = {
        id: user.user_id,
        uname: user.user_name,
        email: user.user_email,
        urole: user.user_type,
      };

      const token = jwt.sign(payloadUser, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: payloadUser,
      });
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Server error", error: err });
    });
};

// =====================
// Get User by Token
// =====================
export const getUserByToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  model.getUserByToken(token)
    .then((result) => {
      if (result === "no data") {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User found successfully",
        user: result[0],
      });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Error finding user", error: err });
    });
};

// =====================
// Register User
// =====================
export const registerUser = (req, res) => {
  const { user_name, user_email, user_password, user_type } = req.body;

  if (!user_name || !user_email || !user_password || !user_type) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: name, email, password, type",
    });
  }

  bcrypt.hash(user_password, 10)
    .then((hashedPassword) => model.registerUser(user_name, user_email, hashedPassword, user_type))
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: err,
      });
    });
};


// =====================
// Delete User by Email & Password
// =====================
export const deleteUserbyEmailAnsPassword = (req, res) => {
  const { user_id, user_email, password } = req.body;

  if (!user_email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  model.deleteUserbyEmailAnsPassword(user_email, user_id)
    .then((result) => {
      if (result === "no data") {
        return res.status(404).json({
          success: false,
          message: "No user found with this email",
        });
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result,
      });

      console.log("Delete successful ✅");
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: err.message || err,
      });
    });
};

// =====================
// Update User Info
// =====================
export const updateUserInfo = (req, res) => {
  const { user_id } = req.body; // Make sure you get user_id from request
  res.render("updateUserInfo.ejs", { user_id });
};

// =====================
// Update Admin Profile
// =====================
export const updateAdminProfile = (req, res) => {
  const { user_id, user_name, user_email } = req.body;

  model.updateAdminProfile(user_id, user_name, user_email)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error("Error updating admin:", err);
      res.status(500).json({ message: "Error updating admin", error: err });
    });
};

// =====================
// Update User Profile
// =====================
export const updateUserProfile = (req, res) => {
  const { user_id, user_name, user_email } = req.body;

  model.updateUserProfile(user_id, user_name, user_email)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Error updating user", error: err });
    });
};

// =====================
// View Users
// =====================
export const viewUsers = (req, res) => {
  model.viewUsers()
    .then((users) => res.status(200).json({ success: true, data: users }))
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({ success: false, message: "Error fetching users", error: err });
    });
};

// =====================
// View Admins
// =====================
export const viewAdmin = (req, res) => {
  model.viewAdmin()
    .then((admin) => res.status(200).json({ success: true, data: admin }))
    .catch((err) => {
      console.error("Error fetching admins:", err);
      res.status(500).json({ success: false, message: "Error fetching admins", error: err });
    });
};

// =====================
// Register Admin
// =====================
export const registerAdmin = (req, res) => {
  const { user_name, user_email, user_password, user_type } = req.body;

  bcrypt.hash(user_password, 10)
    .then((hashedPassword) => model.registerUser(user_name, user_email, hashedPassword, user_type))
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Admin registered successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.error("Error registering admin:", err);
      res.status(500).json({
        success: false,
        message: "Error registering admin",
        error: err,
      });
    });
};

// =====================
// Delete User by ID
// =====================
export const deleteUserById = (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  model.deleteUserById(user_id)
    .then((result) => {
      if (result === "no data") {
        return res.status(404).json({ success: false, message: "No user found with this ID" });
      }
      res.status(200).json({ success: true, message: "User deleted successfully", data: result });
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).json({ success: false, message: "Error deleting user", error: err.message || err });
    });
};

// =====================
// Orders
// =====================
export const getAllOrders = (req, res) => {
  model.getAllOrders()
    .then((orders) => res.status(200).json({ success: true, data: orders }))
    .catch((err) => {
      console.error("Error fetching orders:", err);
      res.status(500).json({ success: false, message: "Error fetching orders", error: err });
    });
};

export const editOrderStatus = (req, res) => {
  const { order_id, status } = req.body;

  if (!order_id || !status) {
    return res.status(400).json({ success: false, message: "Order ID and status are required" });
  }

  model.editOrderStatus(order_id, status)
    .then((result) => res.status(200).json({ success: true, message: "Order status updated", data: result }))
    .catch((err) => {
      console.error("Error updating order status:", err);
      res.status(500).json({ success: false, message: "Error updating order status", error: err.message || err });
    });
};

// =====================
// Update Password
// =====================
export const updatePassword = (req, res) => {
  const { user_email, old_password, new_password } = req.body;

  if (!user_email || !old_password || !new_password) {
    return res.status(400).json({ success: false, message: "Email, old password, and new password required" });
  }

  model.getUserByMail(user_email)
    .then((result) => {
      if (result.length === 0) return res.status(404).json({ message: "User not found" });

      const user = result[0];
      const isMatch = bcrypt.compareSync(old_password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid old password" });

      return bcrypt.hash(new_password, 10);
    })
    .then((hashedPassword) => model.updatePassword(user_email, hashedPassword))
    .then((result) => res.status(200).json({ success: true, message: "Password updated successfully", data: result }))
    .catch((err) => {
      console.error("Error updating password:", err);
      res.status(500).json({ success: false, message: "Error updating password", error: err.message || err });
    });
};
