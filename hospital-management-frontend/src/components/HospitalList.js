import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../HospitalList.css"

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [noRecordsFound, setNoRecordsFound] = useState(false);

  useEffect(() => {
    fetch('https://mern-project-4-ling.onrender.com/api/v1/hospitals')
      .then(response => response.json())
      .then(data => setHospitals(data))
      .catch(error => console.error('Error fetching hospitals:', error));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchCity(value);
    const filtered = hospitals.filter(hospital =>
      hospital.city && hospital.city.toLowerCase().includes(value.toLowerCase())
    );
    setNoRecordsFound(filtered.length === 0 && value.trim() !== '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        const response = await fetch(`https://mern-project-4-ling.onrender.com/api/v1/hospitals/delete?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setHospitals(hospitals.filter(hospital => hospital._id !== id));
        } else {
          const errorData = await response.text();
          throw new Error(`Failed to delete hospital: ${errorData}`);
        }
      } catch (error) {
        console.error('Error deleting hospital:', error);
      }
    }
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.city && hospital.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4">Hospitals</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by city"
          value={searchCity}
          onChange={handleSearchChange}
        />
      </div>
      {noRecordsFound && <p className="no-records">No records found</p>}
      <ul className="list-group">
        {filteredHospitals.map(hospital => (
          <li key={hospital._id} className="list-group-item">
            <Link to={`/hospital/details?id=${hospital._id}`}>
              <h5>{hospital.name}</h5>
              <p>{hospital.address}, {hospital.city}, {hospital.state}, {hospital.zip}</p>
              <small>{hospital.phone}</small>
              <div className="hospital-images">
                {hospital.images && hospital.images.map((image, index) => (
                  <img key={index} src={image} alt={`Hospital ${index}`} className="hospital-image" />
                ))}
              </div>
            </Link>
            <div className="actions">
              <Link to={`/edit-hospital?id=${hospital._id}`}>
                <button className="btn btn-secondary">Edit</button>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(hospital._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HospitalList;
