import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // For sending data to the backend
import './SignUpstyle.css'; // Use the same styles as in the HTML

function SignUp() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [formData, setFormData] = useState({
        name: '',
        SRN: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        const { name, SRN, email, password, confirmPassword } = formData;
    
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                name,
                institution_id: SRN,
                email,
                password,
                role: 'Student',
            });
    
            if (response.status === 201) {
                // Store user data in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
                // Redirect to CanteenList page after successful signup
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during sign-up');
        }
    };
    

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create an Account</h2>
                {error && <p className="error">{error}</p>}
                <form id="sign-up-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="SRN">SRN</label>
                        <input
                            type="text"
                            id="SRN"
                            name="SRN"
                            placeholder="Enter your SRN"
                            value={formData.SRN}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
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
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <p className="register-link">
                    Already have an account? <a href="/signin">Sign In</a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
