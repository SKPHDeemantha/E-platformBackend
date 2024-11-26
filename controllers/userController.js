import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){
     const newUserData = req.body

    newUserData.password = bcrypt.hashSync(newUserData.password,10)

    const User =new user(newUserData)
        User.save().then(()=>{
       res.json({
        message : "User Created"
       })
}).catch(()=>{
    res.json({
        message :"User not created"
    })
})
    
}

export function loginUser(req,res){
    user.find({email : req.body.email}).then(
        (users)=>{
            if(users.length == 0){

                res.json({
               message : "User not found"

                })
            }else{
                const user = users[0]

                const isPasswordCorrect =bcrypt.compareSync
                (req.body.password,user.password)

                if(isPasswordCorrect){
                    const token =jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        isBlocked : user.isBlocked,
                        type : user.type,
                        profilePicture : user.profilePicture
                       },"cbc-Secret-key-12024")
                    
                    res.json({
                        message : "User logged in",
                        token:  token
                    })
                }else{
                    res.json({
                        message : "User not logged in(Wrong password)"
                    })
                }
            }
        }
    )
}