const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {UserModel} = require("../Models/User.model");
require("dotenv").config();


const userRoute = express.Router();

userRoute.post("/register", async(req, res) =>{
    const {name, avatar, email, password} = req.body;

    if(!name || !avatar || !email || !password){
        return res.send("Please fill all the feilds!");
    } else{
        try{
            bcrypt.hash(password, 8, async(err, hash)=>{
                const user = new UserModel({name, email, avatar, password:hash });
                await user.save();
                res.send("Registration Successful!");
            })
        } catch (e){
            res.send(e.message);
        }
    }
});


userRoute.post("/login", async(req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await UserModel.find({email});

        if(user.length > 0){
            bcrypt.compare(password, user[0].password, (err, result) =>{
                if(result){
                    const loggedInUser = user[0];
                    const token = jwt.sign({name:loggedInUser.name, email:loggedInUser.email}, process.env.key);
                    res.send({status: "Login success!", token:token});
                }else{
                    res.send("Incorrect password!");
                }
            })
        } else {
            res.send("Login failed!");
        }
    } catch(e){
        res.send(e.message);
    }
});


module.exports = { userRoute };

