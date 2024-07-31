const express = require('express');
const mongoose = require('mongoose');
const Hospital = require('../models/Hospital');

const router = express.Router();

// Create a new hospital
router.post('/create', async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    const hospital = await newHospital.save();
    res.status(201).json(hospital);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find(req.query);
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get hospital details
router.get('/details', async (req, res) => {
  try {
    const hospitalId = mongoose.Types.ObjectId(req.query.id);
    const hospital = await Hospital.findById(hospitalId);
    if (hospital) {
      res.status(200).json(hospital);
    } else {
      res.status(404).json({ message: 'Hospital not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a hospital
router.put('/update', async (req, res) => {
  const {id} = req.query;
  const updateData = req.body;
  try {
    const hospitalId = mongoose.Types.ObjectId(req.query.id);
    const hospital = await Hospital.findByIdAndUpdate(hospitalId, req.body, { new: true });
    if (hospital) {
      res.status(200).json(hospital);
    } else {
      res.status(404).json({ message: 'Hospital not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete hospital
// Delete a hospital
router.delete('/delete', async (req, res) => {
  try {
    const hospitalId = mongoose.Types.ObjectId(req.query.id);
    const hospital = await Hospital.findByIdAndDelete(hospitalId);
    if (hospital) {
      res.status(204).json(); // No content to return
    } else {
      res.status(404).json({ message: 'Hospital not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;


module.exports = router;
