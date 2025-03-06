const mongoose = require('mongoose');

const WaterCycleSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, 'Please enter status'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const WaterCycle = mongoose.model("WaterCycle", WaterCycleSchema);

module.exports = WaterCycle;