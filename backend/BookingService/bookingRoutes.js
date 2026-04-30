const express = require("express");
const router = express.Router();
const { createBooking, getBooking, cancelBooking } = require("./bookingController.js");
const authMiddleware = require("../AuthService/authMiddleware.js");

router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getBooking);
router.delete("/cancelBooking", authMiddleware, cancelBooking);

module.exports = router;