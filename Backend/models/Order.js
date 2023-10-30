const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    laundry: {
      type: Schema.Types.ObjectId,
      ref: "Laundry",
      required: true,
    },
    laundryName: {
        type: String,
        required: true,
      },
      customerName: {
        type: String,
        required: true,
      },
    customerAddress: {
      type: String,
      required: true,
    },
    laundryAddress: {
      type: String,
      required: true,
    },
    customerlongitude: {
      type: Number,
      required: true,
    },
    service :{
        type : String ,
        required : true ,
    },
    weight: {
        type: Number,
        required: true,
      },
    customerlatitude: {
      type: Number,
      required: true,
    },
    laundrylongitude: {
      type: Number,
      required: true,
    },
    laundrylatitude: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    laundryFee: {
      type: Number,
      required: true,
    },
    pickupDate : {
        type:String ,
        required : true
    },
    deliveryDate : {
        type:String ,
        required : true
    },
    status  :{
        type : String,
        required: true,
        default : 'Pending'
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
