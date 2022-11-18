const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const userRouter=require("./routers/userRouter");
const cookieParser=require("cookie-parser");

dotenv.config({path:"./.env"})

const app=express();

const corsOptions={
    origin:`${process.env.FRONTEND_DOMAIN_URL}`,
    credentials:true
}


//MIDDLEWARES
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/",(req,res)=>{
    console.log("Getting");
    res.status(200).json({
        status:"success1",
    });
})

app.use("/api/v1/users", userRouter)


module.exports=app;