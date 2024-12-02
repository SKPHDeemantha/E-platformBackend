import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){
    if(! isAdmin(req)){
        res.json({
           message : "Please login as administrator to add products" 
        })
        return
    }
    const newProductData =req.body

    Product.save().then(()=>{
        res.json({
            message : "Product created"
        })
    }).catch((error)=>{
        res.json({
            message : error
        })
    })
}
export function getProduct(req,res){
    Product.find({}).then((Products)=>{
    res.json(Products)
})
}