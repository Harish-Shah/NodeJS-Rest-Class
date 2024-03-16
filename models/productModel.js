let mongoose = require("mongoose");

let productSchema = mongoose.Schema({
    id : {
        type : Number,
        required : true 
    },
    name : {
        type : String,
        required : true 
    },
    brand : {
        type : String,
        required : true 
    },
    price : {
        type : String,
        required : true 
    },
    quantity : {
        type : String,
        required : true 
    },
},{
    timestamps : {
        createdAt : "created_date",
        updatedAt : 'updated_date'
    }
})

let productModel = mongoose.model("product",productSchema);

module.exports = productModel;