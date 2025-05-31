const mongoose = require('mongoose');

const WaterSupplySchema = new mongoose.Schema({
    WaterSupply: {
        type: String,
        required: [true, 'Please enter water supply'],
    },
    WaterSource: {
        type: String,
        required: [true, 'Please enter water source'],
    },
    AmountUsed: {
        type: String,
        required: [true, 'Please enter amount used'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const WaterSupplyModel = mongoose.model("WaterSupplyModel", WaterSupplySchema);

module.exports = WaterSupplyModel