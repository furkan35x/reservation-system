const Reservation = require('../models/Reservation');

// Create a new reservation
const createReservation = async (req, res) => {
    const { reservationDate, numberOfGuests, specialRequests } = req.body;

    if (!reservationDate || !numberOfGuests) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const reservation = await Reservation.create({
            user: req.user.id,
            reservationDate,
            numberOfGuests,
            specialRequests,
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reservations for the logged-in user
const getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getMyReservations,
};
