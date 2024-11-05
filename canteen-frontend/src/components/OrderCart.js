import React, { useState } from 'react';
import api from '../services/api';

function OrderCart({ userId, canteenId, menuItems }) {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Function to add items to the cart
    const addToCart = (item) => {
        setCart([...cart, item]);
        setTotalAmount(totalAmount + item.price);
    };

    // Place order by sending data to the backend
    const placeOrder = async () => {
        const items = cart.map(item => ({
            item_id: item.item_id,
            quantity: 1,
            price: item.price,
        }));
        try {
            const response = await api.post('/orders', { user_id: userId, canteen_id: canteenId, items, total_amount: totalAmount });
            alert('Order placed successfully! Order ID: ' + response.data.order_id);
            setCart([]);
            setTotalAmount(0);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    };

    return (
        <div>
            <h2>Order Cart</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.item_id}>
                        {item.name} - ${item.price}
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h3>Cart Total: ${totalAmount}</h3>
            <button onClick={placeOrder} disabled={cart.length === 0}>Place Order</button>
        </div>
    );
}

export default OrderCart;
