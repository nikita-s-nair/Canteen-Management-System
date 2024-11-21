import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './canteen1.css';

function Menu() {
    const { canteenId } = useParams();
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await api.get(`/menu/${canteenId}`);
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        fetchMenu();
    }, [canteenId]);

    const incrementItem = (itemId) => {
        setCart((prevCart) => ({
            ...prevCart,
            [itemId]: (prevCart[itemId] || 0) + 1,
        }));
    };

    const decrementItem = (itemId) => {
        setCart((prevCart) => ({
            ...prevCart,
            [itemId]: prevCart[itemId] > 0 ? prevCart[itemId] - 1 : 0,
        }));
    };

    const calculateTotal = () => {
        return menuItems.reduce((total, item) => {
            return total + (cart[item.item_id] || 0) * item.price;
        }, 0);
    };

    const handleCheckout = () => {
        const totalAmount = calculateTotal();
        const userId = JSON.parse(sessionStorage.getItem('user'))?.user_id; // Retrieve user ID
        const cartData = Object.keys(cart).map((itemId) => {
            const item = menuItems.find((menuItem) => menuItem.item_id === parseInt(itemId));
            return {
                item_id: item.item_id,
                name: item.name,
                quantity: cart[itemId],
                price: item.price,
            };
        });

        if (!userId) {
            alert('User not logged in. Please log in to continue.');
            return;
        }

        // Store data in sessionStorage
        sessionStorage.setItem('cartData', JSON.stringify(cartData));
        sessionStorage.setItem('totalAmount', totalAmount);
        sessionStorage.setItem('canteenId', canteenId);

        // Navigate to the payment page
        navigate('/payment');
    };

    return (
        <div className="container">
            <header>
                <h1>Canteen {canteenId}</h1>
                <p>Choose your food and add it to your cart!</p>
            </header>
            <div className="menu">
                {menuItems.map((item) => (
                    <div className="menu-category" key={item.category}>
                        <h2>{item.category}</h2>
                        <div className="menu-item">
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>₹ {item.price}</p>
                            </div>
                            {cart[item.item_id] > 0 ? (
                                <>
                                    <button className="cart-btn" onClick={() => decrementItem(item.item_id)}>
                                        -
                                    </button>
                                    <span>{cart[item.item_id]}</span>
                                    <button className="cart-btn" onClick={() => incrementItem(item.item_id)}>
                                        +
                                    </button>
                                </>
                            ) : (
                                <button className="add-to-cart" onClick={() => incrementItem(item.item_id)}>
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart">
                <h2>Your Cart</h2>
                <ul id="cart-items">
                    {Object.keys(cart).map((itemId) => {
                        const item = menuItems.find((menuItem) => menuItem.item_id === parseInt(itemId));
                        if (!item || cart[itemId] === 0) return null;
                        return (
                            <li key={itemId}>
                                {item.name} - ₹{item.price} x {cart[itemId]}
                                <button onClick={() => incrementItem(item.item_id)}>+</button>
                                <button onClick={() => decrementItem(item.item_id)}>-</button>
                            </li>
                        );
                    })}
                </ul>
                <p id="total-amount">Total: ₹{calculateTotal()}</p>
                <button id="checkout-btn" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default Menu;
