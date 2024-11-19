import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For sending data to the backend
import './SignUpstyle.css'; // Use the same styles as in the HTML

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    srn: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { srn, password } = formData;

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/signin', {
        institution_id: srn,
        password,
      });

      // If login is successful, navigate to the canteen page
      if (response.status === 200) {
        navigate('/canteens'); // Assuming '/canteens' is the canteen page route
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during sign-in');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome Back!</h2>
        {error && <p className="error">{error}</p>}
        <form id="sign-in-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login-srn">SRN</label>
            <input
              type="text"
              id="login-srn"
              name="srn"
              placeholder="Enter your SRN"
              value={formData.srn}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Sign In</button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
