const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const cors = require("cors");
require("dotenv/config");
const lightSabersRoutes = require("./routes/lightSabers");
const jediMasterRoutes = require("./routes/jediMaster");

const app = express();

app.use(express.json());
app.use(xmlparser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/Jedisabershop", lightSabersRoutes);
app.use("/JediMaster", jediMasterRoutes);

module.exports = app;
