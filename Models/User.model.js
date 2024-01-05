const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type:String, 
        required:true,
        minLength:1,
        maxLength:50
    },
    avatar: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
    
},{ timestamps: true });

const UserModel = mongoose.model("user", userSchema);

module.exports = {UserModel};


