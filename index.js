import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/StudentRouters.js';
import productRouter from './routes/ProductRouters.js';
import userRouter from './routes/UserRouter.js';
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
dotenv.config();

const app = express();

const mongourl =process.env.MONGO_DB_URL;

mongoose.connect(mongourl,{})

const connection = mongoose.connection;


connection.once("open",
    ()=>{
    console.log("Database connected");
})

app.use(bodyparser.json())

app.use(

    (req,res,next)=>{
  
      const token = req.header("Authorization")?.replace("Bearer ","")
      console.log(token)
  
       if(token != null){
       jwt.verify(token,"cbc-Secret-key-12024" , (error,decoded)=>{
  
        if(!error){
              console.log(decode)
            req.user = decoded        
           }
  
         })
       }
  
      next()
  
     }
  
  )

app.use("/api/students",studentRouter)
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)  

app.listen(
    3000,
    ()=>{
        console.log('Server is running on port 3000');
    }
)