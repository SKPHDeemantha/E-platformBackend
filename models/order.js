import mongoose from "mongoose";

const orderSchema =mongoose.Schema({
    itemName : String,
    price : Number,
    brandName : String,
    productType :String,
    size : String, //In this situation,customer should to select it.
    Quntity : Number
})

const order =mongoose.model("Orders",orderSchema)

export default order;