const express=require("express");
const router=express.Router();
const {createFlight, getFlights}=require("../controller/flightController.js");

router.post("/", createFlight);
router.get("/", getFlights);

module.exports=router;