import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCartItems,
  updateCartItem,
  addOrder,
  removeCartItem,
  deleteAddToCartAction, // ✅ new import
} from "../../services/userServices";
import "./Cart.css";

const Cart = () => {
  const query = new URLSearchParams(useLocation().search);
  const user_id = query.get("user_id");
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const getImageUrl = (path) => `http://localhost:3000${path}`;

  // fetch cart items
  const fetchCart = () => {
    if (!user_id) return;
    getCartItems(user_id)
      .then((res) => {
        const items = Array.isArray(res.data) ? res.data : [];
        setCartItems(items);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCart();
  }, [user_id]);

  // recalc total whenever cart changes
  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      const price = item.price - (item.price * (item.discount || 0)) / 100;
      sum += price * item.quantity;
    });
    setTotal(sum.toFixed(2));
  }, [cartItems]);

  // update quantity in backend + state
  const handleQuantityChange = (product_id, newQty) => {
    if (newQty < 1) return; // prevent 0 or negative qty

    updateCartItem({ user_id, product_id, quantity: newQty })
      .then(() => {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product_id === product_id ? { ...item, quantity: newQty } : item
          )
        );
      })
      .catch((err) => console.error(err));
  };

  // remove item from cart + user_interactions
  const handleRemoveItem = (product_id) => {
    // Optimistic UI update
    setCartItems((prev) => prev.filter((item) => item.product_id !== product_id));

    Promise.all([
      removeCartItem({ user_id, product_id }),
      deleteAddToCartAction(user_id, product_id), // ✅ also delete from interactions
    ])
      .then(() => {
        alert("✅ Item removed from cart");
      })
      .catch((err) => {
        console.error("❌ Failed to remove item:", err);
        // rollback UI if failed
        fetchCart();
      });
  };

  // place order
  const handlePlaceOrder = () => {
    addOrder({ user_id, total_amount: total })
      .then(() => {
        alert("✅ Order placed successfully!");
        navigate(`/orders?user_id=${user_id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="cart-page">
      {/* Top bar */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Your Cart</h2>
        <button
          className="orders-btn"
          onClick={() => navigate(`/orders?user_id=${user_id}`)}
        >
          View Orders
        </button>
      </div>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          const discountedPrice =
            item.price - (item.price * (item.discount || 0)) / 100;

          return (
            <div key={item.product_id} className="cart-item">
              <img
                src={getImageUrl(item.product_image)}
                alt={item.product_name}
                className="cart-image"
              />
              <div className="cart-info">
                <h4>{item.product_name}</h4>
                <p className="brand">{item.brand}</p>
                <p className="price">
                  <span className="old">₹{item.price}</span>
                  <span className="new">₹{discountedPrice.toFixed(2)}</span>
                </p>

                <div className="quantity-control">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* ✅ Remove button */}
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="empty">Your cart is empty.</p>
      )}

      {/* Footer with total + place order */}
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <h3>Total: ₹{total}</h3>
          <button className="place-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
