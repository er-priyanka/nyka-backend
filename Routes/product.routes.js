const express = require("express");
const { ProductModel } = require("../Models/Product.model");

const productRoute = express.Router();


// get all products 
productRoute.get("/products", async (req, res) =>{
    try{
        const data = await ProductModel.find();
        res.status(200).send(data);
    }catch (err){
        res.send(err);
    }
});

// get product using id
productRoute.get("/products/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const data = await ProductModel.findOne({"_id":id});
        res.status(200).send(data);
    } catch (err){
        res.send(err);
    }
});

// add new product 
productRoute.post("/products", async (req, res) =>{
    const productData = req.body;

    try{
        const product = new ProductModel(productData);
        product.save();
        res.status(201).send("New Product added successfully!")
    } catch(err){
        res.send(err.message);
    }
});

// edit product 
productRoute.patch("/products/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    
    try{
        await ProductModel.findOneAndUpdate({"_id":id}, payload);
        
        res.status(204).send("Product edited successfully!");
    } catch(err){
        res.send(err.message);
    }

    
});

// delete product 
productRoute.delete("/products/:id", async (req, res) =>{
        const id = req.params.id;

        try{
            await ProductModel.findByIdAndDelete({"_id":id});
            res.status(202).send("Deleted Successfully!");
        } catch (err){
            res.send(err);
        }
});



module.exports = { productRoute };