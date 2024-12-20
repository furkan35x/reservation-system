const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        reservationDate: {
            type: Date,
            required: [true, 'Please add a reservation date'],
        },
        numberOfGuests: {
            type: Number,
            required: [true, 'Please add the number of guests'],
        },
        specialRequests: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
