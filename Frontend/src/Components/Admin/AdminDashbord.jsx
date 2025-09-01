import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [openBox, setOpenBox] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleBox = (box) => {
    setOpenBox(openBox === box ? null : box);
  };

  const navigate = useNavigate();

  // ✅ Get user & token from localStorage
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const location = useLocation();
  const { data } = location.state || {}; // fallback if you passed state

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // redirect to login
  };

  // Get first letter of name
  const profileLetter = user?.uname?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/655cac71f149b81eece12fdc/51ceexg6d3l.jpg" // change this to your logo path
            alt="Logo"
            className="navbar-logo"
          />
        </div>
        <div className="navbar-right">
      

          {/* Profile Dropdown */}
          <div className="profile-wrapper">
            <div
              className="profile-icon"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {profileLetter}
            </div>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <Link to="/editInfo">✏️ Edit Info</Link>
                <Link to="/changePassword">🔑 Change Password</Link>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 🔹 Welcome Section */}
      <div className="welcome">
        <h3>
          Welcome {user ? user.uname : data?.data?.name || "Guest"} 👋
        </h3>
        <h3>Email: {user?.email}</h3>
        <h3>Role: {user?.role}</h3>
        <h3>Token: {token}</h3>
      </div>

      {/* 🔹 Dashboard */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">Products</h1>

        <div className="dashboard-grid">
          {/* Box 1 */}
          <div className="dashboard-box" onClick={() => toggleBox("box1")}>
            <h2>Products</h2>
            {openBox === "box1" && (
              <div className="dropdown-links">
                <Link to="/addProducts">➕ Add Products</Link>
                <Link to="/viewProducts">👁 View Products</Link>
              </div>
            )}
          </div>

          {/* Box 2 */}
          <div className="dashboard-box" onClick={() => toggleBox("box2")}>
            <h2>Stores</h2>
            {openBox === "box2" && (
              <div className="dropdown-links">
                <Link to="/addStore">➕ Add Store</Link>
                <Link to="/getStore">👁 View Stores</Link>
              </div>
            )}
          </div>

          {/* Box 3 */}
          <div className="dashboard-box" onClick={() => toggleBox("box3")}>
            <h2>Ratings</h2>
            {openBox === "box3" && (
              <div className="dropdown-links">
                <Link to="/ratings/add">➕ Add Rating</Link>
                <Link to="/shopRatings">👁 View Ratings</Link>
              </div>
            )}
          </div>

          {/* Box 4 */}
          <div className="dashboard-box" onClick={() => toggleBox("box4")}>
            <h2>Reports</h2>
            {openBox === "box4" && (
              <div className="dropdown-links">
                <Link to="/reports/add">➕ Add Report</Link>
                <Link to="/reports/view">👁 View Reports</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
