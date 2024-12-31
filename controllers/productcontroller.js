import Product  from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){

  if(!isAdmin(req)){
    res.json({
      message: "Please login as administrator to add products"
    })
    return
  }

  const newProductData = req.body

  const product = new Product(newProductData)

  product.save().then(()=>{
    res.json({
      message: "Product created"
    })
  }).catch((error)=>{
    res.status(403).json({
      message: error
    
    })
  })
}

export function getProduct(req,res){
  Product.find({}).then((products)=>{
    res.json(products)
  })
}

export function deleteProduct(req,res){
  if(!isAdmin(req)){
    res.status(403).json({
      message: "Please login as administrator to delete products"
    })
    return
  }

  const productId = req.params.productId

  Product.deleteOne(
    {productId : productId}
  ).then(()=>{
    res.json({
      message: "Product deleted"
    })
  }).catch((error)=>{
    res.status(403).json({
      message: error
    })
  })
}