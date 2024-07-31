import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../HospitalDetails.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HospitalDetails = () => {
  const location = useLocation();
  const query = useQuery();
  const id = query.get('id');
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await fetch(`https://mern-project-4-ling.onrender.com/api/v1/hospitals/details?id=${id}`);
        const data = await response.json();
        setHospital(data);
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    };

    fetchHospital();
  }, [id, location.search]); // Use location.search as a dependency

  if (!hospital) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{hospital.name}</h1>
      <img src={hospital.imageUrl} alt={hospital.name} />
      <p><strong>City:</strong> {hospital.city}</p>
      <p><strong>Specialities:</strong> {hospital.specialities.join(', ')}</p>
      <p><strong>Rating:</strong> {hospital.Rating}</p>
      <p><strong>Description:</strong> {hospital.Description}</p>
      <p><strong>Images:</strong> {hospital.images.join(', ')}</p>
      <p><strong>Number of Doctors:</strong> {hospital.NumberOfDoctors}</p>
      <p><strong>Number of Departments:</strong> {hospital.NumberOfDepartments}</p>
      <Link to={`/edit-hospital?id=${hospital._id}`}>
        <button>Edit Hospital</button>
      </Link>
    </div>
  );
};

export default HospitalDetails;
