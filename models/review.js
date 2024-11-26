import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviwerName : String,
    reviwerEmail :String,
    rating : Number,
    comment : String,
    reviewDate :Number,
    //reviwer wanna picture uploard
})

const review =mongoose.model("reviews",reviewSchema)

export default review