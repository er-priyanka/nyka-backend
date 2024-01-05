const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        minLength:1,
        maxLength:50,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male", "female"],
        required:true
    },
    category:{
        type:String,
        enum:["makeup", "skincare", "haircare"],
        required:true
    },
    price:{
        type:Number,
        required:true
    }
}, { timestamps:true });


const ProductModel = new mongoose.model("product", productSchema);

module.exports = { ProductModel };