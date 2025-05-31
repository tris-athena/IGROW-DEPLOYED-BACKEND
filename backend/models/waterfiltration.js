const mongoose = require('mongoose');

const WaterFiltrationSchema = new mongoose.Schema({
    phLevel: {
        type: String,
        required: [true, 'Please enter phLevel'],
    },
    Usage: {
        type: String,
        required: [true, 'Please enter usage'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const WaterFiltration = mongoose.model("WaterFiltration", WaterFiltrationSchema);

module.exports = WaterFiltration