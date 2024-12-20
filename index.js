import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/StudentRouters.js';
import userRouter from './routes/UserRouter.js';
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import productRouter from './routes/productRouter.js';
import ordertRouter from './routes/oderRouter.js';
import cors from 'cors';
dotenv.config();
//env eke agata ; dapu eka thamai aula
const app = express();

const mongourl = process.env.MONGO_DB_URI
mongoose.connect(mongourl,{})
app.use(cors())

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