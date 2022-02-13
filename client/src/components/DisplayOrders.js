import { useState, useEffect } from "react";
import Orders from "./Orders";
import Pagination from "./Pagination";

function DisplayOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await fetch("https://localhost:7000/JediMaster/orders");
      const data = await response.json();
      setOrders(data.message.order);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="orders-container">
        <Orders orders={currentOrders} loading={loading} />
        <Pagination
          ordersPerPage={ordersPerPage}
          totalOrders={orders.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default DisplayOrders;
