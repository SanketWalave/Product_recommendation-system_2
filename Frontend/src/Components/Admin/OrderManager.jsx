import React, { useEffect, useState } from "react";
import { getAllOrders, editOrder } from "../../services/services";
import "./OrderManager.css";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await editOrder({ order_id: orderId, status: newStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderId ? { ...o, status: newStatus } : o
        )
      );
      alert(`Order ${orderId} status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={idx}>
              <td>{o.order_id}</td>
              <td>{o.user_name}</td>
              <td>{o.user_email}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`http://localhost:3000${o.product_image}`}
                    alt={o.product_name}
                  />
                  {o.product_name}
                </div>
              </td>
              <td>{o.quantity}</td>
              <td>₹{o.total}</td>
              <td className={`status-${o.status}`}>{o.status}</td>
              <td>
                <select
                  className="status-select"
                  value={o.status}
                  onChange={(e) =>
                    handleStatusChange(o.order_id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManager;
