const mongoose = require("mongoose");

const OrderSchema = {
  email: { type: String, required: true },
  products: { type: Object, required: true },
  created_at: { type: String, default: new Date().toDateString() },
  updated_at: { type: String, default: new Date().toDateString() },
};

module.exports = mongoose.model("Order", OrderSchema);
