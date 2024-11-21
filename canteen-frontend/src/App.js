import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CanteenList from './components/CanteenList';
import Menu from './components/Menu';
import OrderCart from './components/OrderCart';
import OrderHistory from './components/OrderHistory';
import PaymentForm from './components/PaymentForm';
import Notifications from './components/Notifications';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));  // Try parsing the user data
            } catch (e) {
                console.error("Failed to parse user data:", e);  // Log an error if parsing fails
            }
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem('user'); // Clear persisted session data
    };

    return (
        <Router>
            <div>
                <h1>Canteens System</h1>
                {/* Display user info and logout button when logged in */}
                {user && (
                    <div>
                        <p>Welcome, {user.name}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
                <Routes>
                    {/* Route for sign-up */}
                    <Route path="/signup" element={<SignUp />} />
                    {/* Route for login */}
                    <Route path="/signin" element={<Login setUser={setUser} />} />
                    {/* Other routes */}
                    <Route path="/" element={<CanteenList />} />
                    <Route path="/menu/:canteenId" element={<Menu />} />
                    <Route path="/cart" element={<OrderCart userId={user?.user_id} />} />
                    <Route path="/history" element={<OrderHistory userId={user?.user_id} />} />
                    <Route path="/payment/" element={<PaymentForm />} />

                    <Route path="/notifications" element={<Notifications userId={user?.user_id} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
