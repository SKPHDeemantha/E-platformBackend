import mongoose from "mongoose"

const productSchema =mongoose.Schema({
    ProductId :{
       type : String,
       required : true,
       unique : true
    },productName :{
        type :String,
        required : true
    },
    altNames : [{
        type : String,
    }],
    images :[{
        type : String
    }],
    price : {
        type : Number,
        required :true
    },lastPrice :{
        type :Number
    },
    stock : {
        type : String
    },
    decription : {
        type :String
    }

})

const Product = mongoose.model("products",productSchema)

export default Product