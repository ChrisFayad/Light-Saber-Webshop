const mongoose = require("mongoose");

const mongoDB = mongoose.createConnection(process.env.USER_DB_CONNECTION);

const orderLightSabersSchema = mongoose.Schema({
  Padawan_Name: {
    type: String,
    required: true,
    trim: true,
  },
  Padawan_Age: {
    type: Number,
    required: true,
  },
  Lightsaber: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
});

module.exports = mongoDB.model("OrderLightSabers", orderLightSabersSchema);
