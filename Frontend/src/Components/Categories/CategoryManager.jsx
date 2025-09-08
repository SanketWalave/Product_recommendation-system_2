import React, { useEffect, useState } from "react";
import {
  addCategoryPost,
  viewCatagory,
  deleteCatagoryById,
  updateCatagoryPostById,
  addSubCategory,
  viewSubCategory,
  deleteSubCategoryById,
  updateSubCategoryPostById,
} from "../../services/services";
import { useNavigate } from "react-router-dom";

const CategoryManager = () => {
  const navigate = useNavigate();

  // Categories
  const [categories, setCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState(null);

  // Subcategories
  const [subcategories, setSubcategories] = useState({});
  const [subcategorySearch, setSubcategorySearch] = useState("");
  const [newSubcategory, setNewSubcategory] = useState({ name: "" });
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  // UI states
  const [openCategory, setOpenCategory] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    viewCatagory()
      .then((res) => {
        if (res.data.success) setCategories(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  // ✅ Add Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    addCategoryPost({
      category_name: newCategory.name,
      description: newCategory.description,
    })
      .then(() => {
        setMessage("✅ Category added!");
        fetchCategories();
        setNewCategory({ name: "", description: "" });
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error adding category"));
  };

  // ✅ Update Category
  const handleUpdateCategory = (e) => {
    e.preventDefault();
   updateCatagoryPostById(editingCategory.category_id, {
  category_name: editingCategory.category_name,
  description: editingCategory.description,
})

      .then(() => {
        setMessage("✏️ Category updated!");
        fetchCategories();
        setEditingCategory(null);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error updating category"));
  };

  // ✅ Delete Category
  const handleDeleteCategory = (id) => {
    if (!window.confirm("⚠️ Delete this category?")) return;
    deleteCatagoryById(id)
      .then(() => {
        setMessage("🗑️ Category deleted!");
        setCategories(categories.filter((c) => c.category_id !== id));
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error deleting category"));
  };

  // ✅ View Subcategories
  const handleViewSubcategories = (category_id) => {
    if (openCategory === category_id) {
      setOpenCategory(null);
      return;
    }
    setOpenCategory(category_id);

    viewSubCategory(category_id)
      .then((res) => {
        if (res.data.success) {
          setSubcategories((prev) => ({
            ...prev,
            [category_id]: res.data.data,
          }));
        }
      })
      .catch((err) => console.error(err));
  };

  // ✅ Add Subcategory
  const handleAddSubcategory = (e, category_id) => {
    e.preventDefault();
    addSubCategory({
      subcategory_name: newSubcategory.name,
      category_id,
    })
      .then(() => {
        setMessage("✅ Subcategory added!");
        handleViewSubcategories(category_id); // refresh
        setNewSubcategory({ name: "" });
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error adding subcategory"));
  };

  // ✅ Update Subcategory
 const handleUpdateSubcategory = (e) => {
  e.preventDefault();
  updateSubCategoryPostById({
    subcategory_id: editingSubcategory.subcategory_id,
    subcategory_name: editingSubcategory.subcategory_name,
  })
    .then(() => {
      setMessage("✏️ Subcategory updated!");
      handleViewSubcategories(editingSubcategory.category_id);
      setEditingSubcategory(null);
      setTimeout(() => setMessage(""), 3000);
    })
    .catch(() => setMessage("❌ Error updating subcategory"));
};



  // ✅ Delete Subcategory
  const handleDeleteSubcategory = (id, category_id) => {
    if (!window.confirm("⚠️ Delete this subcategory?")) return;
    deleteSubCategoryById(id)
      .then(() => {
        setMessage("🗑️ Subcategory deleted!");
        setSubcategories((prev) => ({
          ...prev,
          [category_id]: prev[category_id].filter(
            (s) => s.subcategory_id !== id
          ),
        }));
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error deleting subcategory"));
  };

  // Navigate to products page
  const handleViewProductsPage = (subcategory_id) => {
    navigate(`/subcategory/${subcategory_id}`);
  };

  // Filters
  const categorySearchTerm = (categorySearch ?? "").toLowerCase();
  const subcategorySearchTerm = (subcategorySearch ?? "").toLowerCase();

  const filteredCategories = categories.filter((c) =>
    (c.category_name ?? "").toLowerCase().includes(categorySearchTerm)
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Category Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Add Category */}
      <form
        onSubmit={handleAddCategory}
        className="mb-3 d-flex gap-2 flex-wrap"
      >
        <input
          type="text"
          className="form-control"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
        />
        <button className="btn btn-success">➕ Add Category</button>
      </form>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search categories..."
        value={categorySearch}
        onChange={(e) => setCategorySearch(e.target.value)}
      />

      {/* Categories */}
      <div className="accordion">
        {filteredCategories.map((cat) => (
          <div key={cat.category_id} className="accordion-item mb-2 shadow-sm">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  openCategory === cat.category_id ? "" : "collapsed"
                }`}
                onClick={() => handleViewSubcategories(cat.category_id)}
              >
                {cat.category_name}
              </button>
            </h2>
            {openCategory === cat.category_id && (
              <div className="accordion-body">
                <p>{cat.description ?? "—"}</p>

                {/* Update Category Form */}
                {editingCategory &&
                editingCategory.category_id === cat.category_id ? (
                  <form
                    onSubmit={handleUpdateCategory}
                    className="d-flex gap-2 mb-2"
                  >
                    <input
                      type="text"
                      className="form-control"
                      value={editingCategory.category_name}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          category_name: e.target.value,
                        })
                      }
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      value={editingCategory.description}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          description: e.target.value,
                        })
                      }
                    />
                    <button className="btn btn-primary btn-sm">💾 Save</button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingCategory(null)}
                    >
                      ❌ Cancel
                    </button>
                  </form>
                ) : (
                  <div className="mb-2">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditingCategory(cat)}
                    >
                      ✏️ Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteCategory(cat.category_id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

                {/* Subcategories */}
                <h5>📑 Subcategories</h5>
                <form
                  onSubmit={(e) => handleAddSubcategory(e, cat.category_id)}
                  className="d-flex gap-2 mb-2"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Subcategory"
                    value={newSubcategory.name}
                    onChange={(e) =>
                      setNewSubcategory({ ...newSubcategory, name: e.target.value })
                    }
                    required
                  />
                  <button className="btn btn-success btn-sm">➕ Add</button>
                </form>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="🔍 Search subcategories..."
                  value={subcategorySearch}
                  onChange={(e) => setSubcategorySearch(e.target.value)}
                />

                {subcategories[cat.category_id] &&
                  subcategories[cat.category_id]
                    .filter((s) =>
                      (s.subcategory_name ?? "")
                        .toLowerCase()
                        .includes(subcategorySearchTerm)
                    )
                    .map((sub) => (
                      <div
                        key={sub.subcategory_id}
                        className="card mb-2 p-2 shadow-sm"
                      >
                        {editingSubcategory &&
                        editingSubcategory.subcategory_id ===
                          sub.subcategory_id ? (
                          <form
                            onSubmit={(e) =>
                              handleUpdateSubcategory(e, cat.category_id)
                            }
                            className="d-flex gap-2"
                          >
                            <input
                              type="text"
                              className="form-control"
                              value={editingSubcategory.subcategory_name}
                              onChange={(e) =>
                                setEditingSubcategory({
                                  ...editingSubcategory,
                                  subcategory_name: e.target.value,
                                })
                              }
                              required
                            />
                            <button className="btn btn-primary btn-sm">
                              💾 Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditingSubcategory(null)}
                            >
                              ❌ Cancel
                            </button>
                          </form>
                        ) : (
                          <div className="d-flex justify-content-between align-items-center">
                            <strong>{sub.subcategory_name}</strong>
                            <div>
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => setEditingSubcategory(sub)}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn btn-sm btn-danger me-2"
                                onClick={() =>
                                  handleDeleteSubcategory(
                                    sub.subcategory_id,
                                    cat.category_id
                                  )
                                }
                              >
                                🗑️
                              </button>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() =>
                                  handleViewProductsPage(sub.subcategory_id)
                                }
                              >
                                👁 View Products
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
