const mongoose = require('mongoose');

const AquariumQualitySchema = new mongoose.Schema({
    phLevel: {
        type: String,
        required: [true, 'Please enter ph Level'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AquariumQuality = mongoose.model("AquariumQuality", AquariumQualitySchema);

module.exports =AquariumQuality;