const mongoose = require('mongoose');

const SolarPanelSchema = new mongoose.Schema({
    Wattage: {
        type: String,
        required: [true, 'Please enter wattage'],
    },
    BatteryCharge: {
        type: String,
        required: [true, 'Please enter battery charge'],
    },
    Source: {
        type: String,
        required: [true, 'Please enter source'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SolarPanel = mongoose.model("SolarPanel", SolarPanelSchema);

module.exports = SolarPanel