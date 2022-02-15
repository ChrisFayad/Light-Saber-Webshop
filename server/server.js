const https = require("https");
const path = require("path");
const fs = require("fs");
const app = require("./app");

const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem")),
};

https
  .createServer(options, app)
  .listen(PORT, () => console.log(`Server is running on port ${PORT}`));
