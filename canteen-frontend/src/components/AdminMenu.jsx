import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AdminMenu({ canteenId }) {
    const [menuItems, setMenuItems] = useState([]);
    const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '', availability: true });

    useEffect(() => {
        const fetchMenuItems = async () => {
            const response = await api.get(`/admin/canteens/${canteenId}/menu`);
            setMenuItems(response.data);
        };
        fetchMenuItems();
    }, [canteenId]);

    const handleAddMenuItem = async () => {
        const response = await api.post(`/admin/canteens/${canteenId}/menu`, newMenuItem);
        setMenuItems([...menuItems, { ...newMenuItem, item_id: response.data.itemId }]);
        setNewMenuItem({ name: '', description: '', price: '', availability: true });
    };

    const handleEditMenuItem = async (itemId, updatedItem) => {
        await api.put(`/admin/canteens/${canteenId}/menu/${itemId}`, updatedItem);
        setMenuItems(menuItems.map((item) => (item.item_id === itemId ? updatedItem : item)));
    };

    const handleDeleteMenuItem = async (itemId) => {
        await api.delete(`/admin/canteens/${canteenId}/menu/${itemId}`);
        setMenuItems(menuItems.filter((item) => item.item_id !== itemId));
    };

    return (
        <div>
            <h1>Admin Menu</h1>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.item_id}>
                        {item.name} - ₹{item.price} - {item.availability ? 'Available' : 'Not Available'}
                        <button onClick={() => handleEditMenuItem(item.item_id, { ...item, availability: !item.availability })}>
                            Toggle Availability
                        </button>
                        <button onClick={() => handleDeleteMenuItem(item.item_id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Add Menu Item</h2>
            <input
                type="text"
                placeholder="Item Name"
                value={newMenuItem.name}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={newMenuItem.description}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={newMenuItem.price}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, price: parseFloat(e.target.value) })}
            />
            <label>
                <input
                    type="checkbox"
                    checked={newMenuItem.availability}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, availability: e.target.checked })}
                />
                Available
            </label>
            <button onClick={handleAddMenuItem}>Add Menu Item</button>
        </div>
    );
}

export default AdminMenu;
