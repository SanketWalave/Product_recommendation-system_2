import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategory,
  getSubCategory,
  getProducts,
  addToCart,
  addViewAction,
  addAddToCartAction, // ✅ consistent usage
} from "../../services/userServices";
import { getUserByToken } from "../../services/services";
import "./Offers.css";

const Offers = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ fetch user
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

  // ✅ fetch categories, subcategories, products
  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategory();
        setCategories(cats.data);

        const subs = await getSubCategory();
        setSubCategories(subs.data);

        const prods = await getProducts();

        // ✅ sort by discount (high → low)
        const sorted = [...prods.data].sort(
          (a, b) => parseFloat(b.discount) - parseFloat(a.discount)
        );

        setProducts(sorted);
        setFilteredProducts(sorted);
      } catch (err) {
        console.error("❌ Error fetching offers", err);
      }
    })();
  }, []);

  // ✅ handle search
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

  // ✅ cart & wishlist
  function addCart(product_id) {
    if (!user) return;
    const payload = { user_id: user.user_id, product_id, quantity: 1 };

    addToCart(payload)
      .then(() => {
        return addAddToCartAction(user.user_id, product_id); // ✅ two args like Dashboard
      })
      .then(() => {
        alert("✅ Added to cart!");
      })
      .catch((err) => console.error("❌ Add to cart failed:", err));
  }

  function addWishlist(product_id) {
    if (!user) return;
    addViewAction({ user_id: user.user_id, product_id })
      .then(() => alert("✅ Added to wishlist!"))
      .catch((err) => console.error("❌ Add to wishlist failed:", err));
  }

  function goToProduct(product_id) {
    navigate(`/product/${product_id}?user_id=${user.user_id}`);
  }

  // ✅ filter by category
  function handleCategoryClick(category_id) {
    setSelectedCategory(category_id);
    setSelectedSubCategory(null);
    if (!category_id) {
      setFilteredProducts(products);
      return;
    }
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

  // ✅ filter by subcategory
  function handleSubCategoryClick(subcategory_id) {
    setSelectedSubCategory(subcategory_id);
    if (!subcategory_id) {
      handleCategoryClick(selectedCategory);
      return;
    }
    setFilteredProducts(
      products.filter((p) => p.subcategory_id === subcategory_id)
    );
  }

  return (
    <div className="offers-page">
      <h2>🔥 Best Offers</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search offers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchbar"
      />

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
                  e.stopPropagation();
                  addCart(p.product_id);
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addWishlist(p.product_id);
                }}
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
