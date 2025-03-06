const mongoose = require('mongoose');

const WaterTankQualitySchema = new mongoose.Schema({
    phLevel: {
        type: String,
        required: [true, 'Please enter ph Level'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const WaterTankQuality = mongoose.model("WaterTankQuality", WaterTankQualitySchema);

module.exports = WaterTankQuality;