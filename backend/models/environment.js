const mongoose = require('mongoose');

const EnvironmentSchema = new mongoose.Schema({
    Temperature: {
        type: String,
        required: [true, 'Please enter temperature'],
    },
    Humidity: {
        type: String,
        required: [true, 'Please enter humidity'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Environment = mongoose.model("Environment", EnvironmentSchema);

module.exports = Environment