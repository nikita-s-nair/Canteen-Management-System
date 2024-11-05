import React, { useState } from 'react';
import api from '../services/api';

function PaymentForm({ orderId, amount }) {
    const [paymentStatus, setPaymentStatus] = useState('');

    const makePayment = async () => {
        try {
            const response = await api.post('/payment', { order_id: orderId, amount });
            setPaymentStatus('Payment successful! Payment ID: ' + response.data.payment_id);
        } catch (error) {
            console.error('Error processing payment:', error);
            setPaymentStatus('Payment failed');
        }
    };

    return (
        <div>
            <h2>Payment</h2>
            <p>Amount Due: ${amount}</p>
            <button onClick={makePayment}>Make Payment</button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
}

export default PaymentForm;
