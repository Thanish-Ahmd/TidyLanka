const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pickupSchema = new Schema(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: "Rider",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    stop1: {
      type: String,
      required: true,
    },
    stop2: {
      type: String,
      required: true,
    },
    stop1Longitude: {
      type: Number,
      required: true,
    },
    stop1Latitude: {
      type: Number,
      required: true,
    },
    stop2Longitude: {
      type: Number,
      required: true,
    },
    stop2Latitude: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Started",
    },
    pickupType: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Pickup = mongoose.model("Pickup", pickupSchema);

module.exports = Pickup;
