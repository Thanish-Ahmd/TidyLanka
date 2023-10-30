const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const laundrySchema = new Schema({

    name :{
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
    },
    address : { 
        type: String,
        required: true,
    },
    operatingHours : {
         type : String,
         required :true ,
    },
    contact : {
        type : Number,
        required : true
    },
    paymentMethods :{
        type :String ,
        required : true
    },
    turnAroundTime : {
        type : Number ,
        required : true
    },
    washDryFold : {
        type : Number,
        required: true,
    },
    washIron : {
        type : Number,
        required: true,
    },
    dryClean : {
        type : Number,
        required: true,
    },
    longitude : {
        type : Number,
        required: true,
    },
    latitude : {
        type : Number,
        required: true,
    }

   

} ,{timestamps: true})

const Laundry = mongoose.model("Laundry" , laundrySchema)

module.exports = Laundry;