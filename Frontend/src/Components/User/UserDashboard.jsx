import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getUserByToken } from "../"; // ✅ Import service
import { getUserByToken } from "../../services/services";

// import "./UserDashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [token] = useState(localStorage.getItem("token"));

  

  // ✅ Fetch user details using token
 useEffect(() => {
  if (token) {
    getUserByToken(token)
      .then((res) => {
        console.log("User details:", res.data.user);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }
}, [token]);


  return (
    <>
      <h3>Welcome {user?.uname || "Guest"} 👋</h3>
      <h3>Email: {user?.email}</h3>
      <h3>id: {user?.user_id}</h3>
      <h3>Role: {user?.urole}</h3>
      <h3>Token: {token}</h3>

     
    </>
  );
};

export default UserDashboard;
