import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Sabers({ sabers, loading }) {
  const [saber, setSaber] = useState("");

  const fetchSaber = async (id) => {
    const response = await fetch(
      `https://localhost:7000/Jedisabershop/saber/${id}`
    );
    const data = await response.json();
    setSaber(data.message);
  };

  if (loading) {
    return <h2 className="loading">Loading ...</h2>;
  }
  return (
    <>
      <div className="space"></div>
      {sabers.map((item) => (
        <Accordion className="saber-item" key={item.lightsaberID}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.lightsaberID}-content`}
            id={item.lightsaberID}
            onClick={() => {
              fetchSaber(item.lightsaberID);
            }}
          >
            <Typography>{item.lightsaberName}</Typography>
          </AccordionSummary>
          <AccordionDetails className="saber-details">
            <Typography>{saber.available}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
