import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../HospitalForm.css";

function HospitalForm() {
  const [hospital, setHospital] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    website: '',
    specialities: '',
    images: [],
    Rating: '',
    NumberOfDoctors: '',
    NumberOfDepartments: '',
    Description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospital({
      ...hospital,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://mern-project-4-ling.onrender.com/api/v1/hospitals/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hospital)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Hospital created:', data);
        navigate('/');
      })
      .catch(error => console.error('Error creating hospital:', error));
  };

  return (
    <div>
      <h2 className="mb-4">Add Hospital</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" name="name" value={hospital.name} onChange={handleChange} placeholder="Name" required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input className="form-control" name="address" value={hospital.address} onChange={handleChange} placeholder="Address" required />
        </div>
        <div className="form-group">
          <label>City</label>
          <input className="form-control" name="city" value={hospital.city} onChange={handleChange} placeholder="City" required />
        </div>
        <div className="form-group">
          <label>State</label>
          <input className="form-control" name="state" value={hospital.state} onChange={handleChange} placeholder="State" required />
        </div>
        <div className="form-group">
          <label>ZIP</label>
          <input className="form-control" name="zip" value={hospital.zip} onChange={handleChange} placeholder="ZIP" required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input className="form-control" name="phone" value={hospital.phone} onChange={handleChange} placeholder="Phone" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" name="email" value={hospital.email} onChange={handleChange} placeholder="Email" required />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input className="form-control" name="website" value={hospital.website} onChange={handleChange} placeholder="Website" required />
        </div>
        <div className="form-group">
          <label>Specialities</label>
          <input className="form-control" name="specialities" value={hospital.specialities} onChange={handleChange} placeholder="Specialities" />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input className="form-control" name="Rating" value={hospital.Rating} onChange={handleChange} placeholder="Rating" />
        </div>
        <div className="form-group">
          <label>NumberOfDoctors</label>
          <input className="form-control" name="NumberOfDoctors" value={hospital.NumberOfDoctors} onChange={handleChange} placeholder="Number of Doctors" />
        </div>
        <div className="form-group">
          <label>NumberOfDepartments</label>
          <input className="form-control" name="NumberOfDepartments" value={hospital.NumberOfDepartments} onChange={handleChange} placeholder="Number of Departments" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input className="form-control" name="Description" value={hospital.Description} onChange={handleChange} placeholder="Enter Description" />
        </div>
        <button type="submit" className="btn btn-primary">Add Hospital</button>
      </form>
    </div>
  );
}

export default HospitalForm;
