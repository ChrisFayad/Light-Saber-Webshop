import React, { useState, useEffect } from "react";
import Sabers from "../components/Sabers";
import Pagination from "../components/Pagination";

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

  // Get current sabers
  const indexOfLastSaber = currentPage * sabersPerPage;
  const indexOfFirstSaber = indexOfLastSaber - sabersPerPage;
  const currentSabers = sabers.slice(indexOfFirstSaber, indexOfLastSaber);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h2 className="loading">Loading ...</h2>;
  }

  return (
    <div className="orders-container">
      <Sabers sabers={currentSabers} />
      <Pagination
        ordersPerPage={sabersPerPage}
        totalOrders={sabers.length}
        paginate={paginate}
      />
    </div>
  );
}
