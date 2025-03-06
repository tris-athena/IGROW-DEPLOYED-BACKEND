const WaterDrain = require("../models/waterdrain");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const moment = require("moment-timezone");

exports.CreateData = async (req, res) => {
  try {
      console.log(req.body); // Check what data is being received by the backend

      // Extract form-data fields
      const { state } = req.body;
      const phTime = moment().tz("Asia/Manila").format("MMMM D, YYYY h:mm A");

      // Ensure required fields exist
      if (!state) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      // Create and save new data
      const newData = new WaterDrain({ state, createdAt: phTime });
      await newData.save();

      res.status(200).json({ message: "Data Created Successfully" });
  } catch (error) {
      console.error("Error creating data:", error); // Log the actual error message
      res.status(500).json({ message: "Creating Data Failed", error: error.message });
  }
};
