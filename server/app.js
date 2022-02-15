const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const cors = require("cors");
require("dotenv/config");
const lightSabersRoutes = require("./routes/lightSabers");
const jediMasterRoutes = require("./routes/jediMaster");

const app = express();

app.use(express.json());
app.use(xmlparser());
app.use(express.urlencoded({ extended: false }));
app.use("/Jedisabershop", cors(), lightSabersRoutes);
app.use("/JediMaster", cors(), jediMasterRoutes);

// app.use(
//   "/Jedisabershop",
//   cors({ origin: "https://localhost:3000", "https://localhost:7000" }),
//   lightSabersRoutes
// );

module.exports = app;
