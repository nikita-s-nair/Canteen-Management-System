import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Notifications({ userId }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get(`/notifications/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, [userId]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.notification_id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
