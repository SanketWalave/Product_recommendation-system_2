import React, { useState, useEffect } from "react";
import { getUserByToken, updatePassword, updateAdminProfile } from "../../services/services";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Update Profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Change Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Toggles
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    getUserByToken(token)
      .then((res) => {
        setUser(res.data.user);
        setName(res.data.user.uname);
        setEmail(res.data.user.email);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateAdminProfile({ uname: name, email })
      .then((res) => {
        console.log(res);
        setMessage("✅ Profile updated successfully!");
        setUser({ ...user, uname: name, email });
        setShowProfileForm(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Failed to update profile");
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    updatePassword({
      user_email: email,
      old_password: oldPassword,
      new_password: newPassword,
    })
      .then((res) => {
        console.log(res);
        setMessage("✅ Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setShowPasswordForm(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Failed to update password");
      });
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="profile-container">
      <h2>👋 Welcome, {user?.uname}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.urole}</p>

      {message && <p className="message">{message}</p>}

      {/* Buttons */}
      <div className="profile-actions">
        <button onClick={() => setShowProfileForm(!showProfileForm)}>
          {showProfileForm ? "❌ Cancel Update Profile" : "✏️ Update Profile"}
        </button>
        <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
          {showPasswordForm ? "❌ Cancel Change Password" : "🔑 Change Password"}
        </button>
      </div>

      {/* Update Profile Form */}
      {showProfileForm && (
        <div className="profile-box">
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdateProfile}>
            <input
              type="text"
              value={name}
              placeholder="Enter new name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              value={email}
              placeholder="Enter new email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">💾 Save Changes</button>
          </form>
        </div>
      )}

      {/* Change Password Form */}
      {showPasswordForm && (
        <div className="profile-box">
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              value={oldPassword}
              placeholder="Enter old password"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">🔑 Update Password</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
