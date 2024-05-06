const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: false
    },
    qty: {
      type: Number,
      default: 1
    },
    data: []
  },
  { timeStamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
