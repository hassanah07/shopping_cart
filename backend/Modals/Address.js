const mongoose = require("mongoose");
// const { Schema } = mongoose.Schema;

const AddressSchema = mongoose.Schema(
  {
    addressLineOne: {
      type: String,
      required: true
    },
    landMark: {
      type: String,
      required: true
    },
    town: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    postOffice: {
      type: String,
      required: true
    },
    pin: {
      type: Number,
      required: true
    },
    addressId: {
      type: Number,
      required: true
    }
  },
  { timeStamps: true }
);

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
