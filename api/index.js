import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoute from "./routes/authentication.js"
import userRoutes from './routes/user.js';
const app =express()
dotenv.config()
const connect =async() =>{
    try {
        mongoose.set('strictQuery',true)
        //console.log("Before Connect");
        mongoose.connect(process.env.MONGO,
          {useNewUrlParser: true,
            useUnifiedTopology: true,});
       // console.log("after  Connect");
    
        //console.log("connected to  mongodb")
    
      } 
       catch (error) {
        throw(error);
      }
    };
    //   
     mongoose.connection.on("connected",()=>{
       console.log("Mongodb connected")
     })
    // //
     mongoose.connection.on("disconnected",()=>{
         console.log("Mongodb disconnected")
    })
    //middlewares
    app.use(cors())//when we not use proxy then we use this in client side
    //we can't send directly  json to express thats why
    app.use(express.json())
    ////////////////////////
    app.use(cookieParser())
    app.use("/api/auth",authRoute)
    app.use('/api/user', userRoutes);
    app.use((err,req,res,next)=>{
      const errStatus=err.status || 500
      const errMessage=err.message || "Somthing went wrong!!"
      return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
      })
      //console.log("middleware")
    })
    const PORT=process.env.PORT || 8800
    app.listen(PORT,()=>{
       connect()
        console.log("connceted to Port:"+PORT);
    }) 