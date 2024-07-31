const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  email: String,
  website: String,
  specialities: [String],
  images: [String],
  Rating: String,
  Description: String,
  NumberOfDoctors: String,
  NumberOfDepartments: String,
});

module.exports = mongoose.model('Hospital', hospitalSchema);
