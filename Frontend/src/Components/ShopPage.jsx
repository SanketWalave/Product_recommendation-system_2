import React, { useEffect, useState } from "react";
import { viewProducts, getSubCategoriesNameId } from "../services/services";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    // ✅ Fetch subcategories
    getSubCategoriesNameId()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data.data)) {
          setSubCategories(res.data.data);
        } else {
          setSubCategories([]);
        }
      })
      .catch((err) => console.error("Error fetching subcategories:", err));

    // ✅ Fetch products
    viewProducts()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Filter by search
  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Products for selected subcategory
  const filteredBySubCategory = selectedSubCategory
    ? filteredProducts.filter((p) => p.subcategory_id === selectedSubCategory)
    : [];

  // ✅ Remaining products (exclude selected subcategory ones)
  const remainingProducts = selectedSubCategory
    ? filteredProducts.filter((p) => p.subcategory_id !== selectedSubCategory)
    : filteredProducts;

  // ✅ Utility: calculate final price
  const getFinalPrice = (price, discount) => {
    return discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;
  };
  const login=()=>{
      navigate("/login")
  }
   const loginBycart=()=>{
    alert("you need to login first")
      navigate("/login")
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            MyShop
          </a>
          <div className="d-flex ms-auto">
            <button className="btn btn-outline-light me-2">🛒 Cart</button>
            <button className="btn btn-danger" onClick={login}>Login</button>
          </div>
        </div>
      </nav>

      {/* Search bar */}
      <div className="container my-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary">🔍</button>
        </div>
      </div>

      {/* Subcategories */}
      <div className="container mb-4 text-center">
        {subCategories.length > 0 ? (
          subCategories.map((sub) => (
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
          ))
        ) : (
          <p className="text-muted">No subcategories available</p>
        )}
      </div>

      {/* ✅ Selected subcategory products */}
      {selectedSubCategory && (
        <div className="container mb-5">
          <h4 className="mb-3 text-primary">
            Showing products from{" "}
            {
              subCategories.find(
                (s) => s.subcategory_id === selectedSubCategory
              )?.subcategory_name
            }
          </h4>
          <div className="row g-4">
            {filteredBySubCategory.length > 0 ? (
              filteredBySubCategory.map((p) => (
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
                      {/* <p><strong>ID:</strong> {p.product_id}</p> */}
                      <p>
                        <strong>Brand:</strong> {p.brand}
                      </p>
                      <p>
                        <strong>Description:</strong> {p.destcription}
                      </p>
                      <p>
                        <strong>Subcategory ID:</strong> {p.subcategory_id}
                      </p>
                      <p>
                        <strong>Stock:</strong> {p.stock} {p.stock_unit}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{p.price}
                      </p>
                      <p>
                        <strong>Discount:</strong> {p.discount}%
                      </p>
                      <p>
                        <strong>Final Price:</strong> ₹
                        {getFinalPrice(p.price, p.discount)}
                      </p>
                      <p>
                        <strong>Organic:</strong>{" "}
                        {p.organic === 1 ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="card-footer text-center">
                      <button className="btn btn-primary w-100" onClick={loginBycart}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No products in this subcategory.</p>
            )}
          </div>
        </div>
      )}

      {/* ✅ All Products (excluding selected subcategory) */}
      <div className="container">
        <h4 className="mb-3">All Products</h4>
        <div className="row g-4">
          {remainingProducts.map((p) => (
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
                    <strong>ID:</strong> {p.product_id}
                  </p>
                  <p>
                    <strong>Brand:</strong> {p.brand}
                  </p>
                  <p>
                    <strong>Description:</strong> {p.destcription}
                  </p>
                  <p>
                    <strong>Subcategory ID:</strong> {p.subcategory_id}
                  </p>
                  <p>
                    <strong>Stock:</strong> {p.stock} {p.stock_unit}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{p.price}
                  </p>
                  <p>
                    <strong>Discount:</strong> {p.discount}%
                  </p>
                  <p>
                    <strong>Final Price:</strong> ₹
                    {getFinalPrice(p.price, p.discount)}
                  </p>
                  <p>
                    <strong>Organic:</strong> {p.organic === 1 ? "Yes" : "No"}
                  </p>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-primary w-100" onClick={loginBycart}>
                      Add to Cart
                    </button>
                </div>
              </div>
            </div>
          ))}
          {remainingProducts.length === 0 && (
            <p className="text-center text-muted">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
