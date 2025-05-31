const mongoose = require('mongoose');

const FishFeedingSchema = new mongoose.Schema({
    FeedAmount: {
        type: String,
        required: [true, 'Please enter phLevel'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const FishFeeding = mongoose.model("FishFeeding", FishFeedingSchema);

module.exports = FishFeeding