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

    const getDefaultStructure = (category) => {
        switch(category) {
            case 'Coffee': return { milk: 'Cow', toppings: [], syrups: [] }
            case 'Bubble Tea': return { milk: 'Cow', base: 'Tapioca pearls', toppings: [], syrups: [] }
            case 'Desserts': return { toppings: [] }
            case 'Soft Ice Cream': return { toppings: [], syrups: [] }
            case 'Drip Bags': return {}
            default: return {}
        }
    }

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);

            if (existing) {
                return (prev.map(i => i.id === item.id
                    ? {
                        ...i, instances: [
                            ...i.instances, {
                                id: i.instances.length + 1,
                                structure: getDefaultStructure(item.category)}
                        ]
                    }
                    : i
                ))
            }

            return [...prev, {
                productId: item.id,
                name: item.name,
                desc: item.description,
                price: item.price,
                source: item.source,
                category: item.category,
                instances: [
                    { id: item.id, structure: getDefaultStructure(item.category) },
                ],
            }];
        });
    }

    const removeInstance = (productId, instanceId) => {
        setCart(prev => {
            return prev
                .map(item => item.productId === productId
                    ? { ...item, instances: item.instances.filter(i => i.id !== instanceId) }
                    : item
                ).filter(i => i.instances.length > 0);
        });
    }

    const removeProduct = (productId) => {
        setCart(prev => prev.filter(i => i.productId !== productId))
    }

    const updateInstance = (productId, instanceId, structure) => {
        setCart(prev => prev.map(item =>
            item.productId === productId
                ? { ...item, instances: item.instances.map(i => i.id === instanceId
                    ? {...i, structure: structure} : i
                    )
                }
                : item
            )
        )
    }

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((sum, i) => sum + i.instances.length, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.instances.length, 0).toFixed(2);

    const [itemToppings, setItemToppings] = useState({});
    const updateItemToppings = (id, toppings, toppingPrice) => {
        setItemToppings(prev => ({
            ...prev,
            [id]: { toppings, toppingPrice }
        }))
    }

    const toppingTotal = Object.values(itemToppings)
        .reduce((sum, item) => sum + (item.toppingPrice || 0), 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeInstance,
                removeProduct,
                updateInstance,
                clearCart,
                totalItems,
                totalPrice,
                itemToppings,
                updateItemToppings,
                toppingTotal
            }}
        > {children} </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);