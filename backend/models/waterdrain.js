const mongoose = require('mongoose');

const WaterDrainSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, 'Please enter status'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const WaterDrain = mongoose.model("WaterDrain", WaterDrainSchema);

module.exports = WaterDrain;