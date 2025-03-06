const express = require("express");
const router = express.Router();
const { CreateData } = require("../controllers/environmentController");
const Environment = require("../models/environment");

// POST route to create a new water collection record
router.post("/e-create", CreateData);

// GET route to fetch all water collection records
router.get("/environment", async (req, res) => {
  try {
    const records = await Environment.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

// DELETE route to delete a specific water collection record by ID
router.delete("/environment/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const deletedRecord = await Environment.findByIdAndDelete(id); // Attempt to delete the record by ID
    
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' }); // Return an error if no record was found
    }
    
    res.status(200).json({ message: 'Record deleted successfully' }); // Success response
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).json({ message: "Failed to delete record" }); // Error response
  }
});

module.exports = router;