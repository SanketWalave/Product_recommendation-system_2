import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { getUserByToken } from "../../services/services";

const AdminDashboard = () => {
  const [openBox, setOpenBox] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // no token = redirect
      return;
    }

    // ✅ Always fetch user fresh from backend
    getUserByToken(token)
      .then((res) => {
        console.log("User details:", res.data.user);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token"); // invalid token → logout
        navigate("/login");
      });
  }, [token, navigate]);

  const toggleBox = (box) => {
    setOpenBox(openBox === box ? null : box);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/655cac71f149b81eece12fdc/51ceexg6d3l.jpg"
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
              {user?.uname?.charAt(0).toUpperCase() || "U"}
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
        <h3>Welcome {user?.uname} 👋</h3>
        <h3>Email: {user?.email}</h3>
        <h3>Role: {user?.urole}</h3>
      </div>

      {/* 🔹 Dashboard */}
      <div className="dashboard-container">

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
            <h2>Admins</h2>
            {openBox === "box2" && (
              <div className="dropdown-links">
                <Link to="/registerAdmin">➕ Add admin</Link>
                <Link to="/viewAdmin">👁 View Admins</Link>
              </div>
            )}
          </div>

          {/* Box 3 */}
          <div className="dashboard-box" onClick={() => toggleBox("box3")}>
            <h2>User Control</h2>
            {openBox === "box3" && (
              <div className="dropdown-links">
                <Link to="/registerUser">➕ Add Users</Link>
                <Link to="/viewUser">👁 View Users</Link>
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
