import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpstyle.css'; // Use appropriate styling

function Login({ setUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',    // Change to email
        password: '', // Keep password as it is
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
        const { email, password } = formData;

        try {
            const response = await axios.post('http://localhost:5000/api/signin', {
                email,      // Send email instead of institution_id
                password,
            });
            if (response.status === 200) {
                // Store user data in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user); // Set the user in the state
                // Redirect to CanteenList page after successful login
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label> {/* Changed from SRN to Email */}
                        <input
                            type="email"  // Updated input type to 'email'
                            id="email"
                            name="email"  // Changed name to email
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
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

export default Login;
