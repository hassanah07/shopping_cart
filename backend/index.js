require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMongo = require("./db");
const path = require("path");
const app = express();
const port = process.env.PORT;

connectMongo();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`happy hacking on port: ${port}`);
});
// AVAILABLE API ROUTES
app.use("/api/products", require("./route/products"));
