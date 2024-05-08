const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: false
    },
    addressAdded: {
      type: Boolean,
      default: false
    }
  },
  { timeStamps: true }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
