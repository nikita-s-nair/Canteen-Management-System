import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Payment() {
    const navigate = useNavigate();
    const [paymentMode, setPaymentMode] = useState('');
    const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [canteenId, setCanteenId] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Retrieve data from sessionStorage
        const storedCart = JSON.parse(sessionStorage.getItem('cartData')) || [];
        const storedTotal = sessionStorage.getItem('totalAmount') || 0;
        const storedCanteenId = sessionStorage.getItem('canteenId');
        const storedUser = JSON.parse(sessionStorage.getItem('user'));

        // Log the sessionStorage data
        console.log('Stored Cart:', storedCart);
        console.log('Stored Total Amount:', storedTotal);
        console.log('Stored Canteen ID:', storedCanteenId);
        console.log('Stored User:', storedUser);
        // Log the sessionStorage data



        if (!storedUser) {
            alert('User not logged in!');
            navigate('/login');
            return;
        }

        setCartData(storedCart);
        setTotalAmount(storedTotal);
        setCanteenId(storedCanteenId);
        setUserId(storedUser.user_id);
    }, [navigate]);

    const handlePayment = async () => {
        if (!paymentMode) {
            alert('Please select a payment mode!');
            return;
        }

        try {
            // Create order on the backend
            const response = await api.post('/create-order', {
                userId,
                canteenId,
                cartData,
                totalAmount,
                paymentMode,
            });
            console.log("after api post")
            

            if (response.status === 201) {
                const { orderId } = response.data;

                alert(`Order placed successfully!Order ID: ${orderId}`);
                navigate('/order-summary');
            } else {
                alert('Failed to place order. Try again.');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment</h2>
            <div>
                <h3>Order Summary</h3>
                <ul>
                    {cartData.map(item => (
                        <li key={item.item_id}>
                            {item.name} - ₹{item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Total Amount: ₹{totalAmount}</p>
            </div>
            <div>
                <h3>Payment Mode</h3>
                <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="UPI">UPI</option>
                </select>
            </div>
            <button onClick={handlePayment}>Pay for Your Order</button>
        </div>
    );
}

export default Payment;
