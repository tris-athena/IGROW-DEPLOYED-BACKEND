const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    address: {
      type: String,
      required: [true, 'Please enter your address'],
  },
    role: {
        type: String,
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    dp: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    verificationToken: String,
    resetPasswordToken: String,
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User
