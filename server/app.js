const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("dotenv/config");
const lightSabersRoutes = require("./routes/lightSabers");
const jediMasterRoutes = require("./routes/jediMaster");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/Jedisabershop", cors(), lightSabersRoutes);
app.use("/JediMaster", cors(), jediMasterRoutes);

// app.use(
//   "/Jedisabershop",
//   cors({ origin: "https://localhost:7000" }),
//   lightSabersRoutes
// );

const options = {
  key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem")),
};

https
  .createServer(options, app)
  .listen(PORT, () => console.log(`Server is running on port ${PORT}`));
