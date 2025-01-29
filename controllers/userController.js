import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();


export function createUser(req,res){
     const newUserData = req.body
    if(newUserData.type == "admin"){
        
        if(req.user==null){
            res.json({
            message :"Please login as administrator to create admin accounts"
            })
            return
        }
        if(req.user.type !="admin"){
            res.json({
                message :"Please login as administrtor to create admin accounts"
            })
            return
        }
    }

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
                       },process.env.SECRET)
                    
                    res.json({
                        message : "User logged in",
                        token:  token,
                        user : {
                            firstName :user.firstName,
                            lastName : user.lastName,
                            type : user.type,
                            profilePicture : user.profilePicture,
                            email : user.email
                        }
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
export function isAdmin(req){
        if(req.user ==null){
            return false
        }
        if(req.user.type !="admin"){
            return false

        }
        return true
    }

export function isCustomer(req){
    if(req.user ==null){
        return false
    }
    if(req.user.type != "Customer"){
        return false
    }
    return true 
}    

export function getUser(req,res){
   user.find({}).then((users)=>{
    res.json(users)
   })
}

export async function googleLogin(req,res){
   const token=req.body.token; 

   try{
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const email = response.data.email
      //check if user exists
      const usersList = await user.find({email: email})
      if(usersList.length >0){
        const user = usersList[0]
        const token = jwt.sign({
          email : user.email,
          firstName : user.firstName,
          lastName : user.lastName,
          isBlocked : user.isBlocked,
          type : user.type,
          profilePicture : user.profilePicture
        } , process.env.SECRET)
        
        res.json({
          message: "User logged in",
          token: token,
          user : {
            firstName : user.firstName,
            lastName : user.lastName,
            type : user.type,
            profilePicture : user.profilePicture,
            email : user.email
          }
        })
      }else{
        //create new user
        const newUserData = {
          email: email,
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          type: "customer",
          password: "ffffff",
          profilePicture: response.data.picture
        }
        const user = new User(newUserData)
        user.save().then(()=>{
          res.json({
            message: "User created"
          })
        }).catch((error)=>{
          res.json({      
            message: "User not created"
          })
        })
  
      }
  
   }catch(e){
    res.json({
        message : "Google login failed"
    })
   }
}
