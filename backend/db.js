// getting-started.js
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_URI;

const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(connectionString);
    if (!connect) {
      console.log("DB Connection Problem");
    } else {
      console.log("DB Connected");
    }
  } catch (error) {
    console.log("retrying in 2 Seconds");
    setTimeout(connectMongo, 2000);
  }
};
module.exports = connectMongo;
