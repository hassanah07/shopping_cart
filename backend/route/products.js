const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Cart = require("../Modals/Cart");
const fetchUser = require("../middleware/fetchUser");
const CartItem = require("../Modals/CartItem");

router.post("/findCart", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let cartItem = await CartItem.find({ userId: userId, status: false });
    if (!cartItem) return res.json({ status: false, msg: "Cart Is Empty" });
    if (cartItem) return res.json({ status: true, cart: cartItem });
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error" });
  }
});
router.post("/addToCart", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let cartItem = await CartItem.findOne({
      productId: req.body.productId,
      status: false
    });
    if (!cartItem) {
      cartItem = await CartItem.create({
        userId: userId,
        cartId: req.body.cartId,
        productId: req.body.productId,
        product: req.body.product,
        price: req.body.price,
        qty: req.body.qty
      });
      res.json({ status: true, msg: "Item Added" });
    } else if (cartItem) {
      let quantity = cartItem.qty;
      quantity += 1;
      cartItem = await CartItem.findOneAndUpdate(
        { _id: cartItem._id },
        { qty: quantity }
      );
      res.json({ status: true, msg: "Quantity Added" });
    }
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error", error });
  }
});
router.post("/itemIncrement", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let cartItem = await CartItem.findOne({
      _id: req.body.id,
      userId: userId,
      status: false
    });
    if (cartItem) {
      let quantity = cartItem.qty;
      quantity += 1;
      let product = await CartItem.findOneAndUpdate(
        { _id: req.body.id },
        { qty: quantity }
      );
      res.json({ status: true, msg: "Item quantity updated" });
    } else {
      res.json({ status: true, msg: "Error While Quantity Update" });
    }
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error", error });
  }
});
router.post("/itemDecrement", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let cartItem = await CartItem.findOne({
      _id: req.body.id,
      userId: userId,
      status: false
    });
    if (cartItem) {
      let quantity = cartItem.qty;
      quantity -= 1;
      let product = await CartItem.findOneAndUpdate(
        { _id: req.body.id },
        { qty: quantity }
      );
      res.json({ status: true, msg: "Item quantity updated" });
    } else {
      res.json({ status: true, msg: "Error While Quantity Update" });
    }
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error", error });
  }
});
router.post("/itemDelete", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let cartItem = await CartItem.findOne({
      _id: req.body.id,
      userId: userId,
      status: false
    });
    if (cartItem) {
      let quantity = cartItem.qty;
      quantity -= 1;
      let product = await CartItem.findOneAndDelete({ _id: req.body.id });
      res.json({ status: true, msg: "Item Deleted" });
    } else {
      res.json({ status: true, msg: "Error While Quantity Update" });
    }
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error", error });
  }
});
router.post("/cartNumber", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    let cartItem = await CartItem.find({ userId: userId, status: false });
    if (!cartItem) return res.json({ status: false, msg: "Cart Is Empty" });
    if (cartItem) return res.json({ cart: cartItem.length });
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error" });
  }
});
router.post("/addToCartTest", async (req, res) => {
  // const userId = req.user.id;
  try {
    let cartItem = await CartItem.findOne({
      productId: req.body.productId,
      status: false
    });
    if (!cartItem) {
      cartItem = await CartItem.create({
        // userId: userId,
        // cartId: req.body.cartId,
        productId: req.body.productId,
        product: req.body.product,
        price: req.body.price
        // qty: req.body.qty
      });
      res.json({ status: true, msg: "Item Added", cartItem });
    } else if (cartItem) {
      let quantity = cartItem.qty;
      quantity += 1;
      cartItem = await CartItem.findOneAndUpdate(
        { _id: cartItem._id },
        { qty: quantity }
      );
      res.json({ status: true, msg: "Quantity Added", cartItem });
    }
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error", error });
  }
});
router.post("/findCartTest", async (req, res) => {
  try {
    let cartItem = await CartItem.find({ status: false });
    if (!cartItem) {
      res.json({ status: false, msg: "Cart Is Empty" });
    } else if (cartItem) {
      res.json({ status: true, cart: cartItem, msg: "data found test" });
    }
  } catch (error) {
    res.json({ status: false, msg: "Error! Internal Server Error" });
  }
});
module.exports = router;
