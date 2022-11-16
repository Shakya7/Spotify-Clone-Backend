const express=require("express");
// const userController=require("../controllers/userController");
// const authController=require("../controllers/authController");
//const getFirstAddressController=require("../controllers/client-side-utils/getfirstAddress");
const userController=require("../controllers/userController");

const router=express.Router();

router.route("/test").get(userController.testFunct);




module.exports=router;