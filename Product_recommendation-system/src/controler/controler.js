import e from "express";
import bcrypt from "bcrypt";
import * as model from "../model/model.js";
import jwt from "jsonwebtoken";
// filepath: d:\MERN Project\Product_recommendation-system\src\controler\controler.js
import dotenv from "dotenv";
dotenv.config();
//home page 
export const homePage = (req, res) => {
  res.render("home.ejs")
}

//loging user

export const userLogin = (req, res) => {
  const { email, password } = req.body;

  model.userLogin(email)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      let user = result[0];
      console.log("User found:", user);

      // Check password
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Create a user payload for token and response
      const payloadUser = {
        id: user.user_id,
        uname: user.user_name,
        email: user.user_email,
        urole: user.user_type,
      };

      // Generate JWT
      const token = jwt.sign(payloadUser, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send response
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


// getUserByTocken model

export const getUserByToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token);

  model.getUserByToken(token)
    .then((result) => {
      if (result === "no data") {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User found successfully",
        user: result[0]   // ✅ send single user
      });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({
        message: "Error finding user",
        error: err
      });
    });
};


// Register User
export const registerUser = (req, res) => {
  const { user_name, user_email, user_password, user_type } = req.body;

  bcrypt.hash(user_password, 10)
    .then((hashedPassword) => {
      return model.registerUser(user_name, user_email, hashedPassword, user_type);
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: result
      });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: err
      });
    });
};


export const deleteUserbyEmailAnsPassword = (req, res) => {
  const { user_id, user_email, password } = req.body;

  // Validate input
  if (!user_email || !password) {
    return res.status(400).json({
      success: false,
      message: "❌ Email and password are required"
    });
  }

  model.deleteUserbyEmailAnsPassword(user_email, user_id)
    .then((result) => {
      if (result === "no data") {
        return res.status(404).json({
          success: false,
          message: "⚠️ No user found with this email"
        });
      }

      res.status(200).json({
        success: true,
        message: "🗑️ User deleted successfully",
        data: result
      });
      console.log("✅ Delete successful");
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).json({
        success: false,
        message: "❌ Error deleting user",
        error: err.message || err
      });
    });
};



export const updateUserInfo = (req, res) => {
  res.render("updateUserInfo.ejs", {
    user_id
  })
}



//adminProfile

// export const adminProfile = (req, res) => {
//   const user = req.session.user;
//   if (!user || user.user_type !== "admin") {
//     return res.status(403).send("Unauthorized");
//   }

//   res.render("adminProfile", { admin: user });
// };


//editAdminProfile
// export const editAdminProfile = (req, res) => {
//   const user = req.session.user;
//   res.render("updateAdmin", { admin: user }); // Make sure 'admin' is passed
// };

export const updateAdminProfile = (req, res) => {
  console.log(req.body);
  const { user_id, user_name, user_email } = req.body;

  // model.updateAdminProfile(user_id, user_name, user_email)
  model.updateAdminProfile( user_id, user_name, user_email)
    .then((result) => {
      // res.redirect("/adminProfile"); // Or respond with JSON if API
       res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Error updating user", error: err });
    });
};
export const updateUserProfile = (req, res) => {
  console.log(req.body);
  const { user_id, user_name, user_email } = req.body;

  // model.updateAdminProfile(user_id, user_name, user_email)
  model.updateUserProfile( user_id, user_name, user_email)
    .then((result) => {
      // res.redirect("/adminProfile"); // Or respond with JSON if API
       res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Error updating user", error: err });
    });
};



export const viewUsers = (req, res) => {
  model.viewUsers()
   .then((users) => {
      res.status(200).json({
        success: true,
        data: users
      });
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: err
      });
    });
}


export const viewAdmin = (req, res) => {
  model.viewAdmin()
    .then((admin) => {
      res.status(200).json({
        success: true,
        data: admin
      });
    })
    .catch((err) => {
      console.error("Error fetching admins:", err);
      res.status(500).json({
        success: false,
        message: "Error fetching admins",
        error: err
      });
    });
};


export const registerAdmin=(req,res)=>{
   const { user_name, user_email, user_password, user_type } = req.body;
 bcrypt.hash(user_password, 10)
    .then((hashedPassword) => {
      return model.registerUser(user_name, user_email, hashedPassword, user_type);
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: result
      });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: err
      });
    });
};