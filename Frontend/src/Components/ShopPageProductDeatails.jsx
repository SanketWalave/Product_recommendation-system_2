import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getRelatedProducts, getProductById, addToCart, addViewAction } from "../services/userServices";
import "./ShopPageProductDeatails.css";

const ShopPageProductDeatails = () => {
  const { product_id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const user_id = query.get("user_id"); // optional
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const getImageUrl = (path) => `http://localhost:3000${path}`;

  // fetch product + related
  useEffect(() => {
    if (!product_id) return;

    getProductById(product_id)
      .then((res) => {
        const p = Array.isArray(res.data) ? res.data[0] : res.data;
        setProduct(p);
      })
      .catch((err) => console.error("Product fetch error:", err));

    getRelatedProducts(product_id)
      .then((res) => {
        const relatedArray = Array.isArray(res.data?.data) ? res.data.data : [];
        setRelated(relatedArray);
      })
      .catch((err) => console.error("Related fetch error:", err));
  }, [product_id]);

  // navigation
  function goToProduct(pid) {
    navigate(`/productShop/${pid}${user_id ? `?user_id=${user_id}` : ""}`);
  }

  // actions
  function handleAddToCart(pid) {
    if (!user_id) {
      alert("⚠️ Please login to add to cart");
      return;
    }
    addToCart({ user_id, product_id: pid, quantity: 1 })
      .then(() => alert("✅ Added to cart!"))
      .catch((err) => console.error("Add to cart error:", err));
  }

  function handleWishlist(pid) {
    if (!user_id) {
      alert("⚠️ Please login to add to wishlist");
      return;
    }
    addViewAction({ user_id, product_id: pid })
      .then(() => alert("✅ Added to wishlist!"))
      .catch((err) => console.error("Wishlist error:", err));
  }

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <div className="product-details">
      {/* back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* main product */}
      <div className="main-product">
        <div className="image-wrapper">
          {product.discount > 0 && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
          {product.product_image ? (
            <img src={getImageUrl(product.product_image)} alt={product.product_name} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="product-info">
          <h2>{product.product_name}</h2>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Subcategory:</strong> {product.subcategory_id}</p>
          <p className="desc"><strong>Description:</strong> {product.destcription}</p>
          <p><strong>Stock:</strong> {product.stock} {product.stock_unit}</p>
          <p><strong>Organic:</strong> {product.organic ? "✅ Yes" : "❌ No"}</p>

          <p className="price">
            {product.discount > 0 && <span className="old">₹{product.price}</span>}
            <span className="new">
              ₹{product.price
                ? (product.price - (product.price * (product.discount || 0)) / 100).toFixed(2)
                : "N/A"}
            </span>
          </p>

          <div className="actions">
            <button onClick={() => handleAddToCart(product.product_id)}>Add to Cart</button>
            <button onClick={() => handleWishlist(product.product_id)}>Wishlist</button>
          </div>
        </div>
      </div>

      {/* related products */}
      <h3>Related Products</h3>
      <div className="related-grid">
        {Array.isArray(related) && related.length > 0 ? (
          related.map((r) => (
            <div key={r.product_id} className="related-card" onClick={() => goToProduct(r.product_id)}>
              <div className="image-wrapper">
                {r.discount > 0 && (
                  <span className="discount-badge">-{r.discount}%</span>
                )}
                {r.product_image ? (
                  <img src={getImageUrl(r.product_image)} alt={r.product_name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <h4>{r.product_name}</h4>
              <p className="brand">{r.brand || "Unknown brand"}</p>
              <p className="price">
                {r.discount > 0 && <span className="old">₹{r.price}</span>}
                <span className="new">
                  ₹{r.price
                    ? (r.price - (r.price * (r.discount || 0)) / 100).toFixed(2)
                    : "N/A"}
                </span>
              </p>

              <div className="actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(r.product_id);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(r.product_id);
                  }}
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPageProductDeatails;
