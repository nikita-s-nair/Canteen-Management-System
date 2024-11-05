import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CanteenList from './components/CanteenList';
import Menu from './components/Menu';
import OrderCart from './components/OrderCart';
import OrderHistory from './components/OrderHistory';
import PaymentForm from './components/PaymentForm';
import Notifications from './components/Notifications';

function App() {
    const userId = 1; // Mock user ID for demo, replace with actual user authentication

    return (
        <Router>
            <div>
                <h1>Canteens System</h1>
                <Routes>
                    <Route path="/" element={<CanteenList />} />
                    <Route path="/menu/:canteenId" element={<Menu />} />
                    <Route path="/cart" element={<OrderCart userId={userId} />} />
                    <Route path="/history" element={<OrderHistory userId={userId} />} />
                    <Route path="/payment/:orderId" element={<PaymentForm />} />
                    <Route path="/notifications" element={<Notifications userId={userId} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
