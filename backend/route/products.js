const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Cart = require("../Modals/Cart");

router.post("/addToCart", async (req, res) => {
  console.log("object");
});

module.exports = router;