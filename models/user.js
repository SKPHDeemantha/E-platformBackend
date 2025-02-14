import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email :{
        type :String,
        required :true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isBlock : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        default : "customer"
    },profilePicture : {
        type : String,
        default : "https://www.canva.com/icons/MAEGkZHHSyM-user-profile-illustration/"
    }
})

const user = mongoose.model("users",userSchema)

export default user;
