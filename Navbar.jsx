import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaSignOutAlt, FaHome, FaBook, FaIdCard } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Student';

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  }

  return (
    <motion.nav 
      className="navbar navbar-expand-lg navbar-dark bg-gradient"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaUserGraduate className="me-2" />
          Student Portal
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-1" /> Biodata Form
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                <FaBook className="me-1" /> Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student-card">
                <FaIdCard className="me-1" /> Student Card
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                {userEmail}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}