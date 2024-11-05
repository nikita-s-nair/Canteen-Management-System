import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Menu() {
    const { canteenId } = useParams(); // Get the canteenId from URL
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

    const placeOrder = () => {
        navigate(`/orderCart`, { state: { cart, canteenId, menuItems } });
    };

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.item_id}>
                        {item.name} - ${item.price}
                        {cart[item.item_id] > 0 ? (
                            <>
                                <button onClick={() => decrementItem(item.item_id)}>-</button>
                                <span>{cart[item.item_id]}</span>
                                <button onClick={() => incrementItem(item.item_id)}>+</button>
                            </>
                        ) : (
                            <button onClick={() => incrementItem(item.item_id)}> Add </button>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
}

export default Menu;
