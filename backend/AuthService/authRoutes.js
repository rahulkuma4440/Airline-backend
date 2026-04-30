const express=require("express");
const router=express.Router();
const {login, register}=require("./authController.js"); 

// console.log("Auth routes loaded");
router.post("/login", login);
router.post("/register", register);

module.exports=router;
