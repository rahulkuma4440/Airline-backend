const mongoose=require("mongoose");

const flightSchema=new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            unique: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        source: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalSeats: {
            type: Number,
            required: true
        },
        seatsAvailable: {
            type: Number,
            required: true
        }
    }
);

module.exports=mongoose.model("Flight", flightSchema);