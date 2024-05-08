require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMongo = require("./db");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

connectMongo();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "35mb",
    parameterLimit: 50000
  })
);

// Allow requests from all origins
app.use(cors());

// Allow options for preflight requests
app.options("*", cors());

app.listen(port, () => {
  console.log(`happy hacking on port: ${port}`);
});
// AVAILABLE API ROUTES
app.use("/api/products", require("./route/products"));
app.use("/api/users", require("./route/users"));
