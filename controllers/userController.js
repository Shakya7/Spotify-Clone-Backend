const User = require("../models/userModel");

exports.testFunct=async (req,res)=>{
    try{
        console.log("Interacted with the FE");
        //console.log(req.body);
        res.status(200).json({
            status:"test is successful",
        })
    }catch(err){
        console.log(err.message);
    }
}

exports.getAllUsers=async (req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({
            status:"success",
            results:users.length,
            data:{
                users
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

exports.getUser=async (req,res)=>{
    try{
        const user=await User.findOne({
            email:req.body.email
        });
        if(!user)
            throw "User is not present with this email! Make sure you have entered the correct email"
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
}

exports.getUserDetailsByID=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user)
            throw "User is not present with this email! Make sure you have entered the correct email"
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
}