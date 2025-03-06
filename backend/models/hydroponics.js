const mongoose = require('mongoose');

const HydroponicsSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, 'Please enter water source'],
    },
    direction: {
        type: String,
        required: [true, 'Please water level'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Hydroponics = mongoose.model("Hydroponics", HydroponicsSchema);

module.exports = Hydroponics