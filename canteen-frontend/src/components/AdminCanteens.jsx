import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminCanteens() {
    const [canteens, setCanteens] = useState([]);
    const [newCanteen, setNewCanteen] = useState({ name: '', location: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCanteens = async () => {
            try {
                const response = await api.get('/admin/canteens');
                const data = Array.isArray(response.data) ? response.data : [];
                console.log('Fetched canteens:', data);
                setCanteens(data);
            } catch (error) {
                console.error('Error fetching canteens:', error.response?.data || error.message);
                alert('Failed to fetch canteens');
            }
        };
        fetchCanteens();
    }, []);

    const handleAddCanteen = async () => {
        try {
            const response = await api.post('/admin/canteens', newCanteen);
            setCanteens([...canteens, { ...newCanteen, canteen_id: response.data.canteenId }]);
            setNewCanteen({ name: '', location: '' });
        } catch (error) {
            console.error('Error adding canteen:', error.response?.data || error.message);
            alert('Failed to add canteen');
        }
    };

    return (
        <div>
            <h1>Admin Canteens</h1>
            <ul>
                {Array.isArray(canteens) && canteens.map((canteen) => (
                    <li key={canteen.canteen_id} onClick={() => navigate(`/admin/canteens/${canteen.canteen_id}/menu`)}>
                        {canteen.name} - {canteen.location}
                    </li>
                ))}
            </ul>
            <h2>Add Canteen</h2>
            <input
                type="text"
                placeholder="Canteen Name"
                value={newCanteen.name}
                onChange={(e) => setNewCanteen({ ...newCanteen, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Location"
                value={newCanteen.location}
                onChange={(e) => setNewCanteen({ ...newCanteen, location: e.target.value })}
            />
            <button onClick={handleAddCanteen}>Add Canteen</button>
        </div>
    );
}

export default AdminCanteens;
