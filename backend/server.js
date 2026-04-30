const express = require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.json());

// load env variables
dotenv.config();

// middlewares
app.use(cors());
// app.use(express.json());      //used for req.body to not store undefined

//routes
app.use("/api/auth", require("./AuthService/authRoutes.js"));
app.use("/api/flight", require("./FlightService/flightRoutes.js"));
app.use("/api/booking", require("./BookingService/bookingRoutes.js"));
app.post("/test", (req, res) => {
    console.log(req.body);
    res.send("working");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
        console.log(`Server running on port : ${PORT}`)
    });
}).catch((err) => {
    console.log("DB connection error: ", err.message);
})