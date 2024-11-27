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
    }, 
    comment :{ 
       type : String,
       required :true,
    },
    CreatedAt:{
        type :Date,
        default :Date.now,
    }
    //reviwer wanna picture upload
})

const review =mongoose.model("reviews",reviewSchema)

export default review