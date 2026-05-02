import { useState, useEffect, useContext, createContext } from 'react';
// import {C} from "vite/dist/node/chunks/logger.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return (prev.map(i => i.id === item.id ? {...i, quantity : i.quantity + 1 } : i))
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id));
    }


    const updateCart = (id, quantity) => {
        if (quantity === 0) return removeFromCart(id);
        setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateCart,
                clearCart,
                totalItems,
                totalPrice
            }}
        > {children} </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);