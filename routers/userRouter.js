const express=require("express");
const authController=require("../controllers/authController");
//const getFirstAddressController=require("../controllers/client-side-utils/getfirstAddress");
const userController=require("../controllers/userController");

const router=express.Router();

router.route("/test").get(userController.testFunct);
router.route("/getUser").get(userController.getUser);
router.route("/getAllUsers").get(userController.getAllUsers);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);




module.exports=router;