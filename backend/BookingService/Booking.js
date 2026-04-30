const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        seats: {
            type: Number,
            required: true
        },
        pnr: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
)

module.exports=mongoose.model("Booking", bookingSchema);