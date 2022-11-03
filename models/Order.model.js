const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateOfOrder: Date,

  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },

  places: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Place",
      },

      purchaseQuantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],

  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
