import React, { useEffect, useState } from "react";
import {
  viewProducts,
  viewCatagory,
  getSubCategoriesNameId,
  deletProductById,
} from "../../services/services";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product.css";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch categories, subcategories, products
  useEffect(() => {
    viewCatagory()
      .then((res) => {
        if (res?.data?.data) setCategories(res.data.data);
      })
      .catch((err) => console.error("Error fetching categories:", err));

    getSubCategoriesNameId()
      .then((res) => {
        if (res?.data?.data) setSubCategories(res.data.data);
      })
      .catch((err) => console.error("Error fetching subcategories:", err));

    viewProducts()
      .then((res) => {
        if (res?.data?.data) {
          setProducts(res.data.data);
          setFilteredProducts(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Filter by search
  useEffect(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter((p) =>
        subCategories.some(
          (s) =>
            s.subcategory_id === p.subcategory_id &&
            s.category_id === selectedCategory
        )
      );
    }

    if (selectedSubCategory) {
      result = result.filter((p) => p.subcategory_id === selectedSubCategory);
    }

    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedSubCategory, products, subCategories]);

  // ✅ Utility: calculate final price
  const getFinalPrice = (price, discount) =>
    discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;

  // ✅ Delete product
  const deleteProduct = (id) => {
    if (!confirm("Are you sure to delete this product?")) return;
    deletProductById(id)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.product_id !== id));
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  // ✅ Update product
  const updateProduct = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Product Management</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/addProducts")}
        >
          ➕ Add Product
        </button>
      </div>

      {/* Search */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary">🔍</button>
      </div>

      {/* Categories */}
      <div className="mb-3 text-center">
        <button
          className={`btn mx-2 ${
            selectedCategory === null ? "btn-info" : "btn-outline-info"
          }`}
          onClick={() => {
            setSelectedCategory(null);
            setSelectedSubCategory(null);
          }}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.category_id}
            className={`btn mx-2 ${
              selectedCategory === cat.category_id
                ? "btn-info"
                : "btn-outline-info"
            }`}
            onClick={() => {
              setSelectedCategory(cat.category_id);
              setSelectedSubCategory(null);
            }}
          >
            {cat.category_name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="mb-4 text-center">
          <button
            className={`btn mx-2 ${
              selectedSubCategory === null ? "btn-info" : "btn-outline-info"
            }`}
            onClick={() => setSelectedSubCategory(null)}
          >
            All
          </button>
          {subCategories
            .filter((s) => s.category_id === selectedCategory)
            .map((sub) => (
              <button
                key={sub.subcategory_id}
                className={`btn mx-2 ${
                  selectedSubCategory === sub.subcategory_id
                    ? "btn-info"
                    : "btn-outline-info"
                }`}
                onClick={() =>
                  setSelectedSubCategory(
                    selectedSubCategory === sub.subcategory_id
                      ? null
                      : sub.subcategory_id
                  )
                }
              >
                {sub.subcategory_name}
              </button>
            ))}
        </div>
      )}

      {/* Products */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.product_id} className="col-md-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:3000${p.product_image}`}
                  className="card-img-top"
                  alt={p.product_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.product_name}</h5>
                  <p>
                    <strong>Brand:</strong> {p.brand}
                  </p>
                  <p>
                    <strong>Description:</strong> {p.destcription}
                  </p>
                  <p>
                    <strong>Stock:</strong> {p.stock} {p.stock_unit}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{p.price}
                  </p>
                  {p.discount > 0 && (
                    <p className="text-success">
                      Discount: {p.discount}% → ₹{getFinalPrice(p.price, p.discount)}
                    </p>
                  )}
                  <p>
                    <strong>Organic:</strong> {p.organic === 1 ? "Yes" : "No"}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteProduct(p.product_id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => updateProduct(p.product_id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
