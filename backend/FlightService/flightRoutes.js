const express=require("express");
const router=express.Router();
const {createFlight, getFlights, reserveSeats}=require("./flightController.js");
const adminMiddleware=require("./adminMiddleware.js");
const authMiddleware=require("../AuthService/authMiddleware.js");

router.post("/", authMiddleware, adminMiddleware, createFlight);
router.get("/", getFlights);
router.post("/reserve", reserveSeats);

module.exports=router;