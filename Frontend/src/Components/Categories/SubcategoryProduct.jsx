import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // ✅ FIXED import
import { 
  getProductBySubcategory, 
  deletProductById, 
  addProduct, 
  updateProductPost 
} from "../../services/services";

const SubcategoryProduct = () => {
  const { id } = useParams(); // ✅ subcategory_id comes from URL
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    product_image: null,
    subcategory_id: id,
    brand: "",
    description: "",
    stock_unit: "",
    stock: "",
    price: "",
    discount: "",
    organic: "",
  });

  // ---------------- Fetch Products ----------------
  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = () => {
    getProductBySubcategory(id)
      .then(res => {
        if (res.data.success) setProducts(res.data.data);
      })
      .catch(err => console.error("❌ Error fetching products:", err));
  };

  // ---------------- Delete Product ----------------
  const deleteProduct = (product_id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    deletProductById(product_id)
      .then(() => setProducts(prev => prev.filter(p => p.product_id !== product_id)))
      .catch(err => console.error("Error deleting product:", err));
  };

  // ---------------- Add Product ----------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    addProduct(data, { headers: { "Content-Type": "multipart/form-data" } })
      .then(res => {
        console.log(res);
        alert("✅ Product added successfully!");
        setShowAddForm(false);
        setFormData({
          product_name: "",
          product_image: null,
          subcategory_id: id,
          brand: "",
          description: "",
          stock_unit: "",
          stock: "",
          price: "",
          discount: "",
          organic: "",
        });
        fetchProducts();
      })
      .catch(err => {
        console.error("❌ Error adding product:", err);
        alert("❌ Error adding product");
      });
  };

  // ---------------- Inline Edit ----------------
  const startEdit = (product) => {
    setEditingProduct(product);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditingProduct(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(editingProduct).forEach(key => data.append(key, editingProduct[key]));
    if (editingProduct.product_image instanceof File) {
      data.append("product_image", editingProduct.product_image);
    }

    updateProductPost(data)
      .then(() => {
        alert("✅ Product updated successfully!");
        setEditingProduct(null);
        fetchProducts();
      })
      .catch(err => {
        console.error("❌ Error updating product:", err);
        alert("❌ Failed to update product");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">🛒 Products in Subcategory {id}</h2>

      {/* Add Product Button */}
      <button 
        className="btn btn-success mb-3" 
        onClick={() => setShowAddForm(prev => !prev)}
      >
        {showAddForm ? "Close Add Product Form" : "Add Product"}
      </button>

      {/* Add Product Form */}
      {showAddForm && (
        <form 
          onSubmit={handleAddProduct} 
          encType="multipart/form-data" 
          className="mb-4 p-3 border rounded shadow-sm"
        >
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input 
              type="text" 
              name="product_name" 
              className="form-control" 
              value={formData.product_name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input 
              type="file" 
              name="product_image" 
              accept="image/*" 
              className="form-control" 
              onChange={handleChange} 
              required 
            />
          </div>

          <input type="hidden" name="subcategory_id" value={formData.subcategory_id} />

          <div className="mb-3">
            <label className="form-label">Brand</label>
            <input 
              type="text" 
              name="brand" 
              className="form-control" 
              value={formData.brand} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              name="description" 
              className="form-control" 
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock Unit</label>
            <select 
              name="stock_unit" 
              className="form-select" 
              value={formData.stock_unit} 
              onChange={handleChange} 
              required
            >
              <option value="" disabled>Select unit</option>
              <option value="kg">Kg</option>
              <option value="pieces">Pieces</option>
              <option value="liter">Liter</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input 
              type="number" 
              name="stock" 
              className="form-control" 
              value={formData.stock} 
              onChange={handleChange} 
              min="0" 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input 
              type="number" 
              name="price" 
              className="form-control" 
              value={formData.price} 
              onChange={handleChange} 
              min="1" 
              step="0.01" 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Discount (%)</label>
            <input 
              type="number" 
              name="discount" 
              className="form-control" 
              value={formData.discount} 
              onChange={handleChange} 
              min="0" 
              max="100" 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Organic (1 for Yes, 0 for No)</label>
            <input 
              type="number" 
              name="organic" 
              className="form-control" 
              value={formData.organic} 
              onChange={handleChange} 
              min="0" 
              max="1" 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      )}

      {/* Search */}
      <input 
        type="text" 
        className="form-control mb-3" 
        placeholder="🔍 Search products..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
      />

      {/* Products List */}
      <div className="row">
        {products
          .filter(p => (p.product_name ?? "").toLowerCase().includes(search.toLowerCase()))
          .map(p => (
            <div key={p.product_id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                {p.product_image && (
                  <img 
                    src={`http://localhost:3000${p.product_image}`} 
                    className="card-img-top" 
                    alt={p.product_name} 
                    style={{ height: "200px", objectFit: "cover" }} 
                  />
                )}
                <div className="card-body">
                  {editingProduct && editingProduct.product_id === p.product_id ? (
                    // Inline Edit Form
                    <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
                      <input type="text" name="product_name" className="form-control mb-1" value={editingProduct.product_name} onChange={handleEditChange} required />
                      <input type="text" name="brand" className="form-control mb-1" value={editingProduct.brand} onChange={handleEditChange} required />
                      <textarea name="description" className="form-control mb-1" value={editingProduct.description} onChange={handleEditChange} />
                      <input type="number" name="price" className="form-control mb-1" value={editingProduct.price} onChange={handleEditChange} required />
                      <input type="number" name="stock" className="form-control mb-1" value={editingProduct.stock} onChange={handleEditChange} required />
                      <select name="stock_unit" className="form-select mb-1" value={editingProduct.stock_unit} onChange={handleEditChange}>
                        <option value="kg">Kg</option>
                        <option value="pieces">Pieces</option>
                        <option value="liter">Liter</option>
                      </select>
                      <input type="number" name="discount" className="form-control mb-1" value={editingProduct.discount} onChange={handleEditChange} />
                      <select name="organic" className="form-select mb-1" value={editingProduct.organic} onChange={handleEditChange}>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                      <input type="file" name="product_image" className="form-control mb-1" onChange={handleEditChange} />
                      <button type="submit" className="btn btn-sm btn-success me-1">Save</button>
                      <button type="button" className="btn btn-sm btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <h5 className="card-title">{p.product_name}</h5>
                      <p className="card-text">
                        <strong>Brand:</strong> {p.brand ?? "—"} <br />
                        <strong>Price:</strong> ₹{p.price} <br />
                        <strong>Stock:</strong> {p.stock} {p.stock_unit} <br />
                        <strong>Discount:</strong> {p.discount ? `-${p.discount}%` : "—"} <br />
                        <strong>Organic:</strong> {p.organic ? "✅" : "❌"}
                      </p>
                      <div className="card-footer d-flex justify-content-between">
                        <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(p.product_id)}>Delete</button>
                        <button className="btn btn-sm btn-warning" onClick={() => startEdit(p)}>Update</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {products.length === 0 && <p className="text-center text-muted">No products found.</p>}
    </div>
  );
};

export default SubcategoryProduct;
