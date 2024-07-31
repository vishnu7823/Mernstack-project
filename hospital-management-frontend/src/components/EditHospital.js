import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../EditHospital.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditHospital = () => {
  const query = useQuery();
  const id = query.get('id');
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    rating: '',
    image: '',
    description: '',
    images: [],
    numberOfDoctors: '',
    numberOfDepartments: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await fetch(`https://mern-project-4-ling.onrender.com/api/v1/hospitals/details?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hospital data');
        }
        const data = await response.json();
        setHospital({
          rating: data.Rating || '',
          image: data.image || '',
          description: data.Description || '',
          images: data.images || [],
          numberOfDoctors: data.NumberOfDoctors || '',
          numberOfDepartments: data.NumberOfDepartments || ''
        });
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    };

    fetchHospital();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setHospital(prevState => ({
        ...prevState,
        images: value.split(',').map(url => url.trim())
      }));
    } else {
      setHospital(prevState => ({ ...prevState, [name]: value }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Rating: hospital.rating, // Ensure this matches the state key
      image: hospital.image,
      Description: hospital.description,
      images: hospital.images,
      NumberOfDoctors: hospital.numberOfDoctors,
      NumberOfDepartments: hospital.numberOfDepartments
    };
  
    console.log('Payload:', payload); // Log payload to verify
  
    try {
      const response = await fetch(`https://mern-project-4-ling.onrender.com/api/v1/hospitals/update?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update hospital details: ${errorData}`);
      }
  
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      setMessage('Hospital details updated successfully!');
      setTimeout(() => {
        navigate(`/hospital/details?id=${id}&timestamp=${new Date().getTime()}`);
      }, 2000);
    } catch (error) {
      console.error('Error updating hospital details:', error);
      setMessage('Error updating hospital details: ' + error.message);
    }
  };
  
  

  return (
    <div>
      <h2>Edit Hospital</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            className="form-control"
            value={hospital.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={hospital.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={hospital.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Images (comma-separated URLs)</label>
          <input
            type="text"
            name="images"
            className="form-control"
            value={hospital.images.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Number of Doctors</label>
          <input
            type="number"
            name="numberOfDoctors"
            className="form-control"
            value={hospital.numberOfDoctors}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Number of Departments</label>
          <input
            type="number"
            name="numberOfDepartments"
            className="form-control"
            value={hospital.numberOfDepartments}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Hospital</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default EditHospital;
