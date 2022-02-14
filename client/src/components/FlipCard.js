import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Stack } from "@mui/material";

export default function FlipCard({
  saberName,
  saberAvailable,
  padawanName,
  padawanAge,
  crystalColor,
}) {
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const calculatePrice = async (crystalColor, padawanAge) => {
      try {
        const response = await fetch(
          `https://localhost:7000/JediMaster/crystal/${crystalColor}`
        );
        const data = await response.json();
        const cr = data.message.crystalPower;
        const f = data.message.force;
        const price = Math.round(cr / ((f / 100) * (padawanAge * 10)));
        setUnitPrice(price);
      } catch (error) {
        alert("Something Went Wrong. Please Try Again!");
      }
    };
    calculatePrice(crystalColor, padawanAge);
  });

  function increaseQuantity() {
    setQuantity(quantity + 1);
    setTotalPrice(unitPrice * (quantity + 1));
  }

  function decreaseQuantity() {
    setQuantity((prevQuantity) => prevQuantity - 1);
    setTotalPrice(unitPrice * (quantity - 1));
  }

  const handleClick = async (name) => {
    const body = {
      Padawan_Name: padawanName,
      Padawan_Age: padawanAge,
      Saber_Quantity: quantity,
    };
    const json = JSON.stringify(body);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    };
    const newAvailable = saberAvailable - quantity;
    if (newAvailable >= 0) {
      try {
        const response = await fetch(
          `https://localhost:7000/Jedisabershop/order/saber/${name}`,
          options
        );
        if (response.ok) {
          const data = await response.json();
          setAlert(data.message);

          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      } catch (error) {
        setAlert(error.message);
      }
    } else {
      setError("Sorry, we don't have enough stock!");

      setTimeout(() => {
        setError("");
      }, 2000);
    }
    window.location.reload(true);
  };

  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h3>Light Saber Name: {saberName}</h3>
            <h3>Available: {saberAvailable}</h3>
            <h3>Unit Price: {unitPrice}</h3>
          </div>
          <div className="flip-card-back">
            <h3>Total Price: {totalPrice}</h3>
            <ButtonGroup disableElevation variant="contained">
              <Stack spacing={2} direction="row">
                <Button onClick={increaseQuantity}>+</Button>
                <h3>{quantity}</h3>
                <Button onClick={decreaseQuantity}>-</Button>
              </Stack>
            </ButtonGroup>
            <Stack direction="row" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                onClick={(e) => handleClick(saberName)}
              >
                Place an Order
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      {alert && <h4 className="place-order">{alert}</h4>}
      {error && <h4 className="no-order">{error}</h4>}
    </>
  );
}
