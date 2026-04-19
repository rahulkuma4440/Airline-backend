const Flight = require("../model/Flight.js");

exports.createFlight=async(req, res) => {
    try {

        const {
            flightNumber,
            departureTime,
            arrivalTime,
            source,
            destination,
            price,
            totalSeats
        } = req.body;

        if (!flightNumber || !source || !destination || !totalSeats) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const newFlight=await Flight.create({
            flightNumber: flightNumber,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            source: source,
            destination: destination,
            price: price,
            totalSeats: totalSeats,
            seatsAvailable: totalSeats
        });
        res.status(201).json({
            msg: "Flight created successfully",
            flight: newFlight
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getFlights=async(req, res) => {
    try {
        const flights=await Flight.find();
        res.status(200).json({
            msg: "Flights retrieved successfully",
            flights
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}