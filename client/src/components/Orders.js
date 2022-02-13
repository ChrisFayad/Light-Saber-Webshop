import React from "react";

export default function Orders({ orders, loading }) {
  if (loading) {
    return <h2 className="loading">Loading ...</h2>;
  }
  return (
    <ul className="orders-list">
      {orders.map((order) => (
        <li key={order.orderID} className="orders-list-items">
          <div>
            <h3 className="info-title">Client Info</h3>
            <div className="client-info">
              <h4>Name: {order.padawanInfo.PadawanName}</h4>
              <h4>Age: {order.padawanInfo.PadawanAge}</h4>
            </div>
          </div>
          <div>
            <h3 className="info-title">Order Details</h3>
            <div className="order-info">
              <h4>Product Name: {order.orderDetails.lightsaberName}</h4>
              <h4>Order Quantity: {order.orderDetails.quantity}</h4>
              <h4>Order Total Payment: {order.orderDetails.totalPrice}</h4>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
