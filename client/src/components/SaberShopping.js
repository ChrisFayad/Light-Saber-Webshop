import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlipCard from "./FlipCard";

export default function SaberShopping() {
  const [sabers, setSabers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <h2 className="loading">Loading ...</h2>;
  }
  return (
    <div className="orders-container">
      <h3 className="client">
        Client Name is: {padawanName} | Client Age is: {padawanAge}
      </h3>
      <div className="card-container">
        {sabers.map((item) => {
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
    </div>
  );
}
