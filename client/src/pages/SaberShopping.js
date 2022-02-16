import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlipCard from "../components/FlipCard";
import Pagination from "../components/Pagination";

export default function SaberShopping() {
  const [sabers, setSabers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sabersPerPage] = useState(3);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await fetch(
        "https://localhost:7000/Jedisabershop/saber"
      );
      const data = await response.json();
      setSabers(data.message.sabers);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const location = useLocation();
  const { padawanName, padawanAge } = location.state;

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
      <h3 className="client">
        Client Name is: {padawanName} | Client Age is: {padawanAge}
      </h3>
      <div className="card-container">
        {currentSabers.map((item) => {
          return (
            <FlipCard
              key={item.lightsaberID}
              padawanName={padawanName}
              padawanAge={padawanAge}
              saberName={item.lightsaberName}
              saberAvailable={item.lightsaberAvailable}
              crystalColor={item.saberCrystal}
            />
          );
        })}
      </div>
      <Pagination
        ordersPerPage={sabersPerPage}
        totalOrders={sabers.length}
        paginate={paginate}
      />
    </div>
  );
}
