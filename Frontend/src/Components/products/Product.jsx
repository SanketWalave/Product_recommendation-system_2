import React, { useEffect, useState } from "react";
import { viewProducts, getSubCategoriesNameId ,deletProductById} from "../../services/services";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const navigate = useNavigate();

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

  // ✅ Filter products by search
  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Filter by subcategory
  const filteredBySubCategory = selectedSubCategory
    ? filteredProducts.filter((p) => p.subcategory_id === selectedSubCategory)
    : [];

  const remainingProducts = selectedSubCategory
    ? filteredProducts.filter((p) => p.subcategory_id !== selectedSubCategory)
    : filteredProducts;

  // ✅ Utility: calculate final price
  const getFinalPrice = (price, discount) =>
    discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;

 const deleteProduct = (id) => {
  deletProductById(id)
    .then((res) => {
      alert("Product deleted successfully!");
      console.log(res.data);
      // refresh product list here
    })
    .catch((err) => console.error("Error deleting product:", err));
};


  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Product List</h2>
        <button className="btn btn-success" onClick={() => navigate("/addProducts")}>
          ➕ Add Product
        </button>
      </div>

      {/* Search Bar */}
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

      {/* Subcategories */}
      <div className="mb-4 text-center">
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

      {/* Products by Selected Subcategory */}
      {selectedSubCategory && (
        <div className="mb-5">
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
                      <p><strong>Brand:</strong> {p.brand}</p>
                      <p><strong>Description:</strong> {p.destcription}</p>
                      <p><strong>Stock:</strong> {p.stock} {p.stock_unit}</p>
                      <p><strong>Price:</strong> ₹{p.price}</p>
                      {p.discount > 0 && (
                        <p className="text-success">
                          Discount: {p.discount}% → ₹{getFinalPrice(p.price, p.discount)}
                        </p>
                      )}
                      <p><strong>Organic:</strong> {p.organic === 1 ? "Yes" : "No"}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-danger"
                        // onClick={deleteProduct(p.product_id)}
                        onClick={()=>deleteProduct(p.product_id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => navigate(`/updateProduct/${p.product_id}`)}
                      >
                        Update
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

      {/* All Products */}
      <div>
        <h4 className="mb-3">All Products</h4>
        <div className="row g-4">
          {remainingProducts.length > 0 ? (
            remainingProducts.map((p) => (
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
                    <p><strong>Brand:</strong> {p.brand}</p>
                    <p><strong>Description:</strong> {p.destcription}</p>
                    <p><strong>Stock:</strong> {p.stock} {p.stock_unit}</p>
                    <p><strong>Price:</strong> ₹{p.price}</p>
                    {p.discount > 0 && (
                      <p className="text-success">
                        Discount: {p.discount}% → ₹{getFinalPrice(p.price, p.discount)}
                      </p>
                    )}
                    <p><strong>Organic:</strong> {p.organic === 1 ? "Yes" : "No"}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                     <button
                        className="btn btn-sm btn-danger"
                        onClick={()=>deleteProduct(p.product_id)}
                      >
                        Delete
                      </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/updateProduct/${p.product_id}`)}
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
    </div>
  );
};

export default Product;
