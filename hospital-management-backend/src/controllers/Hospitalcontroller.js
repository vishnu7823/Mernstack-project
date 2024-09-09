const Hospital = require('../models/Hospital');

exports.createHospital = async (req, res) => {
  const newHospital = new Hospital(req.body);
  try {
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getHospitalById = async (req, res) => {
  const id = req.query.id;
  try {
    const hospital = await Hospital.findById(id);
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateHospital = async (req, res) => {
  const id = req.query.id;
  console.log('Update Request Body:', req.body); // Log the request body
  console.log('Updating hospital with ID:', id); // Log the hospital ID
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    console.log('Updated Hospital:', updatedHospital); // Log the updated document
    res.status(200).json(updatedHospital);
  } catch (error) {
    console.error('Error updating hospital:', error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};



exports.deleteHospital = async (req, res) => {
  const id = req.query.id;
  try {
    await Hospital.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
