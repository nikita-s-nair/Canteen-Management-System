import React, { useEffect, useState } from 'react';
import api from '../services/api';

function OrderHistory({ userId }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get(`/orders/user/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };
        fetchOrders();
    }, [userId]);

    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.order_id}>
                        Order ID: {order.order_id}, Total: ${order.total_amount}, Status: {order.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderHistory;
