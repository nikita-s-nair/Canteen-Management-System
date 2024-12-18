/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginStyle.css'; // Add styles for Login page

function Login({ setUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
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
        const { email, password } = formData;

        try {
            const response = await axios.post('http://localhost:5000/api/signin', {
                email,
                password,
            });
            if (response.status === 200) {
                const { user } = response.data;
                setUser(user); // Save user data in state
                sessionStorage.setItem('user', JSON.stringify(user)); // Persist user session
                navigate('/canteens');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login to Your Account</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
*/