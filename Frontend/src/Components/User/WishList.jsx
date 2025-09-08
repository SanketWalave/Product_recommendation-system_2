import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../services/services";
import {
  addToCart,
  addAddToCartAction,
  removeFromWishlist,
  getViewAction, // ✅ wishlist fetcher
} from "../../services/userServices";
import "./WishList.css";

const WishList = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch user
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    getUserByToken(token)
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  // ✅ Fetch wishlist products
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getViewAction(user.user_id)
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setProducts(res.data.data); // directly set wishlist products
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching wishlist:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // ✅ Add to cart
  const handleAddCart = (product_id) => {
    if (!user) return;
    const payload = { user_id: user.user_id, product_id, quantity: 1 };
    addToCart(payload)
      .then(() => addAddToCartAction(user.user_id, product_id))
      .then(() => alert("✅ Added to cart!"))
      .catch((err) => console.error("❌ Add to cart failed:", err));
  };

  // ✅ Remove from wishlist
  const handleRemoveWishlist = (product_id) => {
    if (!user) return;
    removeFromWishlist(user.user_id, product_id)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.product_id !== product_id));
        alert("❌ Removed from wishlist!");
      })
      .catch((err) => console.error("❌ Remove failed:", err));
  };

  // ✅ Navigate to product details
  const goToProduct = (product_id) => {
    navigate(`/product/${product_id}?user_id=${user.user_id}`);
  };

  if (loading) return <p className="loading">Loading wishlist...</p>;
  if (!products.length) return <p className="no-products">Your wishlist is empty.</p>;

  return (
    <div className="wishlist-page">
      <h2>💖 Your Wishlist</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div
            key={p.user_inter_id} // ✅ use unique key from wishlist entry
            className="product-card"
            onClick={() => goToProduct(p.product_id)}
          >
            {p.discount > 0 && <span className="discount">{p.discount}% OFF</span>}

            <img
              src={`http://localhost:3000${p.product_image}`}
              alt={p.product_name}
              className="product-img"
            />

            <h3>{p.product_name}</h3>
            <p className="brand">{p.brand}</p>
            <p className="subcategory">{p.subcategory_name}</p>
            <p className="category">{p.category_name}</p>
            <p className="price">
              <span className="old">₹{p.price}</span>{" "}
              <span className="new">
                ₹{(p.price - (p.price * p.discount) / 100).toFixed(2)}
              </span>
            </p>

            <div className="btn-group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddCart(p.product_id);
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveWishlist(p.product_id);
                }}
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
