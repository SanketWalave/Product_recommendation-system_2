import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrders, deleteOrderById } from "../../services/userServices"; 
import "./Orders.css";

const Orders = () => {
  const query = new URLSearchParams(useLocation().search);
  const user_id = query.get("user_id");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user_id) return;
    getOrders(user_id)
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => console.error(err));
  }, [user_id]);

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrderById(orderId)
        .then(() => {
          alert("✅ Order deleted successfully!");
          setOrders((prev) => prev.filter((o) => o.order_id !== orderId));
        })
        .catch((err) => console.error(err));
    }
  };

  // group products by order_id
  const groupedOrders = orders.reduce((acc, item) => {
    if (!acc[item.order_id]) {
      acc[item.order_id] = {
        order_id: item.order_id,
        status: item.status,
        total: item.total, // backend bill
        order_date: item.order_date,
        products: [],
      };
    }
    acc[item.order_id].products.push(item);
    return acc;
  }, {});

  return (
    <div className="orders-page">
      <div className="orders-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Your Orders</h2>
      </div>

      {Object.values(groupedOrders).length > 0 ? (
        Object.values(groupedOrders).map((order) => {
          // 🧮 calculate frontend total
          let calculatedTotal = 0;
          order.products.forEach((p) => {
            calculatedTotal += (parseFloat(p.price) || 0) * (Number(p.quantity) || 0);
          });

          return (
            <div key={order.order_id} className="order-card">
              <h3>Order #{order.order_id}</h3>
              <p>
                Status:{" "}
                <span
                  className={`status-badge ${
                    order.status === "pending" ? "pending" : "completed"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p>Date: {new Date(order.order_date).toLocaleString()}</p>

              <hr />

              <div className="order-items">
                {order.products.map((p) => (
                  <div key={p.product_id} className="order-item">
                    <span className="name">{p.product_name}</span>
                    <span className="desc">{p.destcription}</span>
                    <span className="qty">Qty: {p.quantity}</span>
                    <span className="price">Price: ₹{p.price}</span>
                  </div>
                ))}
              </div>

              {/* 🧾 Bill Summary */}
              <div className="bill-summary">
                <p>
                  Original Bill :{" "}
                  <strong>₹{calculatedTotal.toFixed(2)}</strong>
                </p>
                <p>
                   Bill After Discount:{" "}
                  <strong>₹{parseFloat(order.total).toFixed(2)}</strong>
                </p>
              </div>

              {/* Delete button */}
              <div className="order-actions">
                <button
                  className="delete-btn"
                  disabled={order.status !== "pending"}
                  onClick={() => handleDeleteOrder(order.order_id)}
                >
                  🗑 Delete Order
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="empty">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
