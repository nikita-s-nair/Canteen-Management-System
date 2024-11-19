import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './CanteenList.css';


function CanteenList() {
    const [canteens, setCanteens] = useState([]);
    const navigate = useNavigate();

    // Fetch the list of canteens
    useEffect(() => {
        const fetchCanteens = async () => {
            try {
                const response = await api.get('/canteens');
                setCanteens(response.data);
            } catch (error) {
                console.error('Error fetching canteens:', error);
            }
        };
        fetchCanteens();
    }, []);

    // Navigate to the menu of the selected canteen
    const goToMenu = (canteenId) => {
        navigate(`/menu/${canteenId}`);
    };

    return (
        <body>
        <div>
            <h2>Available Canteens</h2>
            <ul>
                {canteens.map(canteen => (
                    <li key={canteen.canteen_id} onClick={() => goToMenu(canteen.canteen_id)}>
                        {canteen.name}
                    </li>
                ))}
            </ul>
        </div>
        </body>
    );
}

export default CanteenList;
