// context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.item_id === item.item_id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.item_id === item.item_id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.item_id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(i =>
                    i.item_id === itemId
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                );
            } else {
                return prevItems.filter(i => i.item_id !== itemId);
            }
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, calculateTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
