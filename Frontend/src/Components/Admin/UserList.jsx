import React, { useEffect, useState } from "react";
import { getUsers, updateUserProfile, deleteUser } from "../../services/services";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ user_id: "", user_name: "", user_email: "" });
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers()
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  // Handle update click
  const handleUpdateClick = (user) => {
    setEditingUser(user.user_id);
    setFormData({
      user_id: user.user_id,
      user_name: user.user_name,
      user_email: user.user_email,
    });
  };

  // Update submit
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_id: formData.user_id,
      user_name: formData.user_name,
      user_email: formData.user_email,
    };

    updateUserProfile(data)
      .then(() => {
        setMessage("✅ User updated successfully!");
        setEditingUser(null);
        fetchUsers();
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "❌ Error updating user");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // Handle delete by ID
  const handleDelete = (user_id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this user?")) return;

    deleteUser( user_id )
      .then((res) => {
        setMessage(res.data.message || "🗑️ User deleted successfully!");
        setUsers((prev) => prev.filter((u) => u.user_id !== user_id));
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setMessage(err.response?.data?.message || "❌ Error deleting user");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.user_name.toLowerCase().includes(search.toLowerCase()) ||
      u.user_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Management</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Search bar + Add button */}
      <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/registerUser" className="btn btn-success">
          ➕ Add User
        </Link>
      </div>

      {/* User list */}
      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.user_id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">{user.user_name}</h5>
                  <p className="card-text text-muted">{user.user_email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleUpdateClick(user)}
                  >
                    ✏️ Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update form */}
      {editingUser && (
        <div className="mt-4 card p-4 shadow">
          <h4 className="mb-3">Update User</h4>
          <form onSubmit={handleUpdateSubmit}>
            <input type="hidden" value={formData.user_id} />
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.user_name}
                onChange={(e) =>
                  setFormData({ ...formData, user_name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.user_email}
                onChange={(e) =>
                  setFormData({ ...formData, user_email: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              💾 Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditingUser(null)}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;
