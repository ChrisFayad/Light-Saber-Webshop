import React, { useState, useEffect } from "react";
import Sabers from "./Sabers";
import Pagination from "./Pagination";

export default function DisplaySabers() {
  const [sabers, setSabers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sabersPerPage] = useState(3);

  useEffect(() => {
    const fetchSabers = async () => {
      setLoading(true);
      const response = await fetch(
        "https://localhost:7000/Jedisabershop/saber"
      );
      const data = await response.json();
      setSabers(data.message.sabers);
      setLoading(false);
    };
    fetchSabers();
  }, []);

  // Get current orders
  const indexOfLastOrder = currentPage * sabersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - sabersPerPage;
  const currentSabers = sabers.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="orders-container">
      <Sabers sabers={currentSabers} loading={loading} />
      <Pagination
        ordersPerPage={sabersPerPage}
        totalOrders={sabers.length}
        paginate={paginate}
      />
    </div>
  );
}
