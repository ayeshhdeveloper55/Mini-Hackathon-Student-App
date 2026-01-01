import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginSignup from './components/LoginSignup';
import BiodataForm from './components/BiodataForm';
import CourseDetails from './components/CourseDetails';
import StudentCard from './components/StudentCard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/" element={
            <PrivateRoute>
              <>
                <Navbar />
                <div className="container mt-4">
                  <BiodataForm />
                </div>
              </>
            </PrivateRoute>
          } />
          <Route path="/courses" element={
            <PrivateRoute>
              <>
                <Navbar />
                <div className="container mt-4">
                  <CourseDetails />
                </div>
              </>
            </PrivateRoute>
          } />
          <Route path="/student-card" element={
            <PrivateRoute>
              <>
                <Navbar />
                <div className="container mt-4">
                  <StudentCard />
                </div>
              </>
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;