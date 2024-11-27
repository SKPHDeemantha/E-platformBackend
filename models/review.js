import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviwerName : String,
    reviwerEmail :String,
    rating : Number,
    comment : String,
    reviewDate :Number,
    reviewTime : Number,
    //reviwer wanna picture upload
})

const review =mongoose.model("reviews",reviewSchema)

export default review