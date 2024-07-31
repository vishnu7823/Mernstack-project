import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HospitalList from './components/HospitalList';
import HospitalForm from './components/HospitalForm';
import HospitalDetails from './components/HospitalDetails';
import EditHospital from './components/EditHospital';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <h1>Hospital Management System</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/add-hospital">Add Hospital</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HospitalList />} />
          <Route path="/add-hospital" element={<HospitalForm />} />
          <Route path="/hospital/details" element={<HospitalDetails />} />
          <Route path="/edit-hospital" element={<EditHospital />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
