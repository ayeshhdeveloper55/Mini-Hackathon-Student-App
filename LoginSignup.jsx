import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Fake validation
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill all fields',
      });
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match',
      });
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      if (isLogin) {
        // Fake login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to Student Portal',
          showConfirmButton: false,
          timer: 1500
        });
        
        navigate('/');
      } else {
        // Fake signup
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'Please login to continue',
          showConfirmButton: false,
          timer: 1500
        });
        setIsLogin(true);
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <motion.div 
                className="text-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaUser className="display-4 text-primary mb-3" />
                <h2 className="fw-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <FaEnvelope className="me-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <FaLock className="me-2" />
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                </div>

                {!isLogin && (
                  <div className="mb-4">
                    <label className="form-label">
                      <FaLock className="me-2" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength="6"
                    />
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg w-100 mb-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                </motion.button>
              </form>

              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin 
                    ? "Don't have an account? Sign Up" 
                    : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}