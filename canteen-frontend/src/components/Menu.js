import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function Menu() {
    const { canteenId } = useParams(); // Get the canteenId from URL
    const [menuItems, setMenuItems] = useState([]);

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

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.item_id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
