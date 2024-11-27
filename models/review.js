import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviwerName :{
      type : String,
      ref : 'user',
      required :true
    }, 
    reviwerEmail : {
      type :  String,
      ref :"user",
      required :true
    },
    rating :{
        type : Number,
        required :true,
        min :1,
        max :5
    } 
    comment : String,
    reviewDate :Number,
    reviewTime : Number,
    //reviwer wanna picture upload
})

const review =mongoose.model("reviews",reviewSchema)

export default review