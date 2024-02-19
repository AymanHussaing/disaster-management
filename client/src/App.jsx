import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DisasterForm from './pages/DisasterForm';
import DisasterList from './pages/DisasterList';
import HomePage from './pages/HomePage'; // assuming you have a HomePage component
import DisasterPage from './pages/DisasterPage';
import VolunteerRegistration from './pages/VolunteerRegistration';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register/disaster" element={<DisasterForm />} />
        <Route path="/disasters" element={<DisasterList />} />
        <Route path="/disaster/:id" element={<DisasterPage />} />
        <Route path="/volunteer/registration" element={<VolunteerRegistration />} />
      </Routes>
  );
}

export default App;
