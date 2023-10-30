const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const riderSchema = new Schema({

    name :{
        type: String,
        required: true
    },
    email : { 
        type: String,
        required: true,
    },
    password : {
         type : String,
         required :true ,
    },
    contact : {
        type : Number,
        required : true
    },
    address :{
        type :String,
        required :true
    },
    nicPassport : {
        type :String,
        required :true
    },
    licenseNo :{
        type :String ,
        required : true
    },
    licenseIssueDate : {
        type : String ,
        required : true
    },
    licenseExpiryDate : {
        type : String,
        required :true ,
   },
   vehicleNo :{
    type : String,
        required :true ,
   },
   vehicleModel :{
    type : String,
    required :true ,
   },


   

} ,{timestamps: true})

const Rider = mongoose.model("Rider" , riderSchema)

module.exports = Rider;