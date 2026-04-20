const express=require("express");
const router=express.Router();
const {createFlight, getFlights}=require("../controller/flightController.js");
const adminMiddleware=require("../Middleware/adminMiddleware.js");
const authMiddleware=require("../Middleware/authMiddleware.js");

router.post("/", authMiddleware, adminMiddleware, createFlight);
router.get("/", getFlights);

module.exports=router;