const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema(
  {
    userId: {
      type: String
      // required: true
    },
    // cartId: {
    //   type: String,
    //   required: true
    // },
    productId: {
      type: String,
      required: true
    },
    product: [],
    price: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      default: 1
    },
    mode: {
      type: String
    },
    paymentRefNo: {
      type: String
    },
    shippingDetails: {
      name: {
        type: String
      },
      shippingId: {
        type: String
      },
      deliveryStatus: {
        type: Boolean,
        default: false
      }
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timeStamps: true }
);
const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
