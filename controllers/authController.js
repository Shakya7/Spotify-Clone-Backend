const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
//const emailSend=require("../utils/email");
const crypto=require("crypto");
const bcrypt=require("bcryptjs");

exports.signup=async(req,res)=>{
    try{
        const newUser=await User.create(req.body);
        const token=jwt.sign({id:newUser._id,email:newUser.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
        const cookieOptions={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
            httpOnly:true,
            secure:true
        }
        res.cookie("jwt",token,cookieOptions);
        res.status(201).json({
            status:"success",
            data:{
                user:newUser
            }
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.login=async(req,res)=>{    
    try{
        const {email,password}=req.body;
        const user=await User.findOne({
            email:email
        }).select("+password");
        if(!user)
            throw `Please enter a valid email or password`;

        //comparing with the entered password with the password hashed in DB to match
        const correct=await user.compareNormalPwithHashedP(password,user.password);
        if(!correct) 
            throw `Please provide valid email or password`;   
        console.log(user);

        //Sending the JWT as a cookie
        const token= jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES}); 
        const cookieOptions={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
            httpOnly:true,
            secure:true
        }
        res.cookie("jwt",token,cookieOptions);

        res.status(200).json({
            status:"success",
            message:"You have logged in successfully",
            data:{
                user,
            }
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.logout=async(req,res)=>{
    try{
        const cookieOptions={
            expires: new Date(Date.now()-10*1000),
            httpOnly:true,
            secure:true,
            //domain:"localhost",
            //path: '/',
        };
        console.log("Logging out");
        //res.clearCookie('jwt');
        res.cookie("jwt","null",cookieOptions);
        console.log("Deleted cookie");
        res.status(200).json({
            status:"success",
            message:"Cookie has been deleted"
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}