const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter email address"],
        lowercase:true,
        validate:[validator.isEmail,"Please enter a valid email id..."],
        unique:[true,"Please enter a different email since its already registered."]
    },
    gender:{
        type:String,
        enum:["Male","Female"],
        default:"Male"
    },
    password:{
        type:String,
        minlength:8,
        required:[true,"Please enter a password"],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,"Please confirm your password"],
        validate:{
            validator:function(e){
                return e===this.password
            },
            message:"Passwords do not match, please try again"
        }
    },
    mobile:{
        type:String,
        validate:{
            validator:function(e){
                return e.length<=10
            },
            message:"Please provide a valid phone number"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken:{
        type:String,
        select:false
    },
    passwordResetTokenExpiry:Date,
    activated:{
        type:Boolean,
        default:true,
        select:false
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    isLoggedIn:{
        type:Boolean,
        default:true
    }
});