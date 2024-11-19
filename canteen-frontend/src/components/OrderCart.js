// components/OrderCart.js
import React from 'react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function OrderCart() {
    const { cartItems, calculateTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        const userId = 1; // Replace with actual user ID
        const canteenId = 1; // Replace with actual canteen ID
        const totalAmount = calculateTotal();

        try {
            const response = await api.post('/order/place-order', {
                userId,
                canteenId,
                cartItems,
                totalAmount,
            });

            if (response.data.success) {
                alert('Order placed successfully!');
                clearCart();
                navigate('/order-success'); // Redirect to success page
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order.');
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.item_id}>
                        {item.name} - {item.quantity} x ${item.price}
                    </li>
                ))}
            </ul>
            <h3>Total: ${calculateTotal()}</h3>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default OrderCart;
