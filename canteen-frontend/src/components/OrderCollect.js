import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './canteen1.css'; // Styles for the page

function OrderCollect() {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState('');
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    useEffect(() => {
        const storedOrderId = sessionStorage.getItem('orderId');
        if (!storedOrderId) {
            alert('No active order found!');
            navigate('/');
            return;
        }
        setOrderId(storedOrderId);

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    alert('Order time expired!');
                    navigate('/');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Clean up the timer on unmount
    }, [navigate]);

    const cancelOrder = async () => {
        try {
            await api.delete(`/orderCollect/${orderId}`);
            alert('Order cancelled successfully.');
            sessionStorage.removeItem('orderId');
            navigate('/');
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('Failed to cancel the order. Please try again.');
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="order-collect-container">
            <h2>Order Confirmation</h2>
            <p>Order ID: {orderId}</p>
            <p>Time Left: {formatTime(timeLeft)}</p>
            <button onClick={cancelOrder}>Cancel Order</button>
        </div>
    );
}

export default OrderCollect;
