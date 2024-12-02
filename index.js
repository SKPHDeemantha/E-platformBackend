import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/StudentRouters.js';
import userRouter from './routes/UserRouter.js';
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import productRouter from './routes/productRouter.js';
import ordertRouter from './routes/oderRouter.js';
dotenv.config();

const app = express();

const mongourl ="mongodb+srv://Admin:1234@cluster0.cx1ng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
       jwt.verify(token,process.env.SECRET , (error,decoded)=>{
  
        if(!error){
            req.user = decoded        
           }
  
         })
       }
  
      next()
  
     }
  
  )

app.use("/api/students",studentRouter)
app.use("/api/users",userRouter)  
app.use("/api/products",productRouter)
app.use("/api/orders",ordertRouter)  

app.listen(
    3000,
    ()=>{
        console.log('Server is running on port 3000');
    }
)