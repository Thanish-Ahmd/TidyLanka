const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    name :{
        type: String,
        required: true
    },
    address : { 
        type: String,
        required: true,
    },
    email : {
         type : String,
         required :true ,
    },
    contact : {
        type : Number,
        required : true
    },
    longitude :{
        type :Number ,
        required : true
    },
    latitude : {
        type : Number ,
        required : true
    },
    password : {
        type : String,
        required :true ,
   },

   

} ,{timestamps: true})

const Customer = mongoose.model("Customer" , customerSchema)

module.exports = Customer;