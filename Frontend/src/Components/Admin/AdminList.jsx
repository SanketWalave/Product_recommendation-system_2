import React, { useEffect, useState } from "react";
import { getAdmin, updateAdminProfile, deleteAdmin } from "../../services/services";
import { Link } from "react-router-dom";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [formData, setFormData] = useState({ user_id: "", user_name: "", user_email: "" });
  const [deleteData, setDeleteData] = useState({ user_email: "", password: "" });
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // Fetch admins
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    getAdmin()
      .then((res) => {
        if (res.data.success) {
          setAdmins(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching admins:", err));
  };

  // Handle update click
  const handleUpdateClick = (admin) => {
    setEditingAdmin(admin.user_id);
    setFormData({
      user_id: admin.user_id,
      user_name: admin.user_name,
      user_email: admin.user_email,
    });
    setDeletingAdmin(null);
  };

  // Handle delete click
  const handleDeleteClick = (admin) => {
    setDeletingAdmin(admin.user_id);
    setDeleteData({ user_email: "", password: "" });
    setEditingAdmin(null);
  };

  // Update submit
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_id: formData.user_id,
      user_name: formData.user_name,
      user_email: formData.user_email,
    };

    updateAdminProfile(data)
      .then(() => {
        setMessage("✅ Admin updated successfully!");
        setEditingAdmin(null);
        fetchAdmins();
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "❌ Error updating admin");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // Delete submit
  const handleDeleteSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("⚠️ Are you sure you want to permanently delete this admin?")) {
      return;
    }

    const data = {
      user_id: deletingAdmin,
      user_email: deleteData.user_email,
      password: deleteData.password,
    };

    deleteAdmin(data)
      .then((res) => {
        console.log("Delete API response:", res.data);
        setMessage(res.data.message || "🗑️ Admin deleted successfully!");

        setAdmins((prevAdmins) =>
          prevAdmins.filter((a) => a.user_id !== deletingAdmin)
        );

        setDeletingAdmin(null);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setMessage(err.response?.data?.message || "❌ Error deleting admin");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  // Filter admins
  const filteredAdmins = admins.filter(
    (a) =>
      a.user_name.toLowerCase().includes(search.toLowerCase()) ||
      a.user_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Management</h2>

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
        <Link to="/registerAdmin" className="btn btn-success">
          ➕ Add Admin
        </Link>
      </div>

      {/* Admin list */}
      <div className="row">
        {filteredAdmins.map((admin) => (
          <div key={admin.user_id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">{admin.user_name}</h5>
                  <p className="card-text text-muted">{admin.user_email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleUpdateClick(admin)}
                  >
                    ✏️ Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(admin)}
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
      {editingAdmin && (
        <div className="mt-4 card p-4 shadow">
          <h4 className="mb-3">Update Admin</h4>
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
              onClick={() => setEditingAdmin(null)}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      )}

      {/* Delete form */}
      {deletingAdmin && (
        <div className="mt-4 card p-4 shadow">
          <h4 className="mb-3 text-danger">Delete Admin</h4>
          <form onSubmit={handleDeleteSubmit}>
            <div className="mb-3">
              <label className="form-label">Confirm Email</label>
              <input
                type="email"
                className="form-control"
                value={deleteData.user_email}
                onChange={(e) =>
                  setDeleteData({ ...deleteData, user_email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={deleteData.password}
                onChange={(e) =>
                  setDeleteData({ ...deleteData, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-danger">
              🗑️ Confirm Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setDeletingAdmin(null)}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminList;
