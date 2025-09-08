import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategory,
  getSubCategory,
  getProducts,
  addToCart,
  addViewAction,
  addAddToCartAction,
} from "../services/userServices";
import { getUserByToken } from "../services/services";
import "./ShopPage.css";

const ShopPage = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dropdownRef = useRef(null);

  // fetch user
  useEffect(() => {
    if (!token) return;
    getUserByToken(token)
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, [token]);

  // fetch categories, subcategories, products
  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategory();
        setCategories(cats.data);

        const subs = await getSubCategory();
        setSubCategories(subs.data);

        const prods = await getProducts();
        setProducts(prods.data);
        setFilteredProducts(prods.data);
      } catch (err) {
        console.error("❌ Error fetching initial data", err);
      }
    })();
  }, []);

  // search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts(products);
      return;
    }
    const lower = search.toLowerCase();
    const results = products.filter(
      (p) =>
        p.product_name?.toLowerCase().includes(lower) ||
        categories.find(
          (c) =>
            c.category_name?.toLowerCase().includes(lower) &&
            subCategories.some(
              (s) =>
                s.category_id === c.category_id &&
                s.subcategory_id === p.subcategory_id
            )
        ) ||
        subCategories.find(
          (s) =>
            s.subcategory_name?.toLowerCase().includes(lower) &&
            s.subcategory_id === p.subcategory_id
        )
    );
    setFilteredProducts(results);
  }, [search, products, categories, subCategories]);

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // add to cart
  function addCart(product_id) {
    if (!user) return setShowLoginPopup(true);
    addToCart({ user_id: user.user_id, product_id, quantity: 1 })
      .then(() => {
        alert("✅ Added to cart!");
        addAddToCartAction(user.user_id, product_id).catch((err) =>
          console.error("❌ Logging add-to-cart action failed:", err)
        );
      })
      .catch((err) => console.error("❌ Add to cart failed:", err));
  }

  // wishlist
  function addWishlist(product_id) {
    if (!user) return setShowLoginPopup(true);
    addViewAction({ user_id: user.user_id, product_id })
      .then(() => alert("✅ Added to wishlist!"))
      .catch((err) => console.error("❌ Add to wishlist failed:", err));
  }

  // navigation helpers
  function goToCart() {
    if (!user) return setShowLoginPopup(true);
    navigate(`/cart?user_id=${user.user_id}`);
  }
  function goToWishlist() {
    if (!user) return setShowLoginPopup(true);
    navigate(`/wishlist?user_id=${user.user_id}`);
  }
  function goToRecommendations() {
    if (!user) return setShowLoginPopup(true);
    navigate(`/recommendations?user_id=${user.user_id}`);
  }
  function goToOffers() {
    navigate(`/offers`);
  }
  function goToProduct(product_id) {
    navigate(`/productShop/${product_id}`);
  }
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  // filters
  function handleCategoryClick(category_id) {
    setSelectedCategory(category_id);
    setSelectedSubCategory(null);
    if (!category_id) return setFilteredProducts(products);
    setFilteredProducts(
      products.filter((p) =>
        subCategories.some(
          (s) =>
            s.subcategory_id === p.subcategory_id &&
            s.category_id === category_id
        )
      )
    );
  }

  function handleSubCategoryClick(subcategory_id) {
    setSelectedSubCategory(subcategory_id);
    if (!subcategory_id) return handleCategoryClick(selectedCategory);
    setFilteredProducts(
      products.filter((p) => p.subcategory_id === subcategory_id)
    );
  }

  return (
    <div className="dashboard">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">Perfect</div>

        <input
          type="text"
          placeholder="Search products, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar"
        />

        <div className="nav-icons">
          <div className="nav-item" onClick={goToCart}>
            <span className="icon">🛒</span>
            <span className="label">Cart</span>
          </div>

          <div className="nav-item" onClick={goToWishlist}>
            <span className="icon">❤️</span>
            <span className="label">Wishlist</span>
          </div>

          <div className="nav-item" onClick={goToRecommendations}>
            <span className="icon">⭐</span>
            <span className="label">Recs</span>
          </div>

          <div className="nav-item" onClick={goToOffers}>
            <span className="icon">💰</span>
            <span className="label">Offers</span>
          </div>

          {/* Profile */}
          <div className="nav-item profile" ref={dropdownRef}>
            <span
              className="icon profile-icon"
              onClick={() => {
                if (!user) {
                  navigate("/login"); // open login if not logged in
                } else {
                  setShowProfileDropdown((prev) => !prev);
                }
              }}
            >
              {user ? user.uname?.[0]?.toUpperCase() : "🔑"}
            </span>
            <span className="label">{user ? user.uname : "Login"}</span>

            {user && showProfileDropdown && (
              <div className="dropdown">
                <button onClick={() => navigate("/profile")}>Edit Profile</button>
                <button onClick={() => navigate("/change-password")}>
                  Change Password
                </button>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="filters">
        <button
          className={`filter-btn ${selectedCategory === null ? "active" : ""}`}
          onClick={() => handleCategoryClick(null)}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.category_id}
            onClick={() => handleCategoryClick(cat.category_id)}
            className={`filter-btn ${
              selectedCategory === cat.category_id ? "active" : ""
            }`}
          >
            {cat.category_name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="filters subfilter">
          <button
            className={`filter-btn ${
              selectedSubCategory === null ? "active" : ""
            }`}
            onClick={() => handleSubCategoryClick(null)}
          >
            All
          </button>
          {subCategories
            .filter((s) => s.category_id === selectedCategory)
            .map((sub) => (
              <button
                key={sub.subcategory_id}
                onClick={() => handleSubCategoryClick(sub.subcategory_id)}
                className={`filter-btn ${
                  selectedSubCategory === sub.subcategory_id ? "active" : ""
                }`}
              >
                {sub.subcategory_name}
              </button>
            ))}
        </div>
      )}

      {/* Products */}
      <div className="products-grid">
        {filteredProducts.map((p) => (
          <div
            key={p.product_id}
            className="product-card"
            onClick={() => goToProduct(p.product_id)}
          >
            {p.discount > 0 && (
              <span className="discount">{p.discount}% OFF</span>
            )}

            <img
              src={`http://localhost:3000${p.product_image}`}
              alt={p.product_name}
              className="product-img"
            />

            <h3>{p.product_name}</h3>
            <p className="brand">{p.brand}</p>
            <p className="price">
              <span className="old">₹{p.price}</span>{" "}
              <span className="new">
                ₹{(p.price - (p.price * p.discount) / 100).toFixed(2)}
              </span>
            </p>

            <div className="btn-group">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigation
                  addCart(p.product_id);
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigation
                  addWishlist(p.product_id);
                }}
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Login Required</h3>
            <p>You need to login first to continue.</p>
            <div className="popup-buttons">
              <button onClick={() => navigate("/login")}>Go to Login</button>
              <button onClick={() => setShowLoginPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
