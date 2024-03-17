let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products: {
        type: [],
        required: false
    },
    cart:{
        type:[],
        required: false
    },
},{
    timestamps:{
        createdAt:"created_date",
        updatedAt:"updated_date"
    }
})

let userModels = mongoose.model('userModel',userSchema);

module.exports = userModels;