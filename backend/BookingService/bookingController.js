const Booking=require("./Booking.js");

const generatePNR = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

exports.createBooking=async(req, res) => {
    try{
        const {flightId, seats} = req.body;
        const userId=req.user.id;

        if (!flightId || !seats) {
            return res.status(400).json({ msg: "flightId and seats are required" });
        }

        const response = await axios.post(
            "http://localhost:5002/api/flights/reserve",
            {flightId, seats}
        );

        const flight = response.data;

        if(!flight) {
            return res.status(400).json({ msg: `${seats} seats not available`});
        }

        const booking = await Booking.create({
            userId: userId,
            flightId: flightId,
            seats: seats,
            pnr: generatePNR(),
            price: seats*flight.price
        });

        return res.status(201).json({ 
            msg: "Booking successful",
            booking
        });
    }
    catch(err) {
        return res.status(500).json({ msg: err.response?.data?.msg || err.message });
    }
}

exports.getBooking = async(req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Booking.find({userId});

        return res.status(200).json({
            msg: "Booking retrived sucesfully",
            bookings
        })
    }
    catch(err) {
        return res.status(500).json({ msg: err.message });
    }
}

exports.cancelBooking = async(req, res) => {
    try {
        const bookingId = req.body.bookingId;

        const booking = await Booking.findById(bookingId);

        if(!booking) {
            return res.status(400).json({ msg: "Booking not found" });
        }

        await Flight.findByIdAndUpdate(
            booking.flightId,
            { $inc: {seatsAvailable: booking.seats}}
        );

        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({ msg: "Booking cancelled successfully"});
    }
    catch(err) {
        return res.status(500).json({ msg: err.message });
    }
}