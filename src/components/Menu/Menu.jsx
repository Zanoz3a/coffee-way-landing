import { useState } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import './Menu.scss'

const categories = ['All', 'Coffee', 'Bubble Tea', 'Desserts', 'Drip Bags', 'Soft Ice Cream']

const menuItems = [
    { id: 1, category: 'Coffee', name: 'Espresso', desc: 'Rich and bold shot of pure coffee', source: 'espresso', price: '3.50' },
    { id: 2, category: 'Coffee', name: 'Cappuccino', desc: 'Espresso with steamed milk foam', source: 'cappuccino', price: '4.50' },
    { id: 3, category: 'Coffee', name: 'Flat White', desc: 'Smooth and velvety with a double shot', source: 'flat-white', price: '4.80' },
    { id: 4, category: 'Bubble Tea', name: 'Classic Milk Tea', desc: 'Creamy tea with tapioca pearls', source: 'bubble-tea', price: '5.50' },
    { id: 5, category: 'Bubble Tea', name: 'Matcha Latte', desc: 'Japanese matcha with oat milk', source: 'matcha-bubble', price: '5.80' },
    { id: 6, category: 'Desserts', name: 'Cheesecake', desc: 'Creamy New York style cheesecake', source: 'cheesecake', price: '6.00' },
    { id: 7, category: 'Desserts', name: 'Brownie', desc: 'Warm chocolate brownie with nuts', source: 'brownie', price: '4.50' },
    { id: 8, category: 'Drip Bags', name: 'Ethiopia Yirgacheffe', desc: 'Fruity and floral single origin', source: 'drip-bag-green', price: '3.00' },
    { id: 9, category: 'Drip Bags', name: 'Colombia Huila', desc: 'Caramel and chocolate notes', source: 'drip-bag-yellow', price: '3.00' },
    { id: 10, category: 'Soft Ice Cream', name: 'Vanilla Soft Serve', desc: 'Classic creamy soft ice cream', source: 'vanilla-ice-cream', price: '3.50' },
    { id: 11, category: 'Soft Ice Cream', name: 'Matcha Soft Serve', desc: 'Japanese matcha soft ice cream', source: 'matcha-ice-cream', price: '4.00' },
]

const Menu = () => {
    const [active, setActive] = useState('All')
    const { cart, addToCart, updateCart, removeFromCart, totalItems, totalPrice } = useCart()

    const filtered = active === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === active)

    return (
        <section className="menu" id="menu">
            <div className="menu-container">
                <div className="menu-header">
                    <p className="menu-subtitle">What we offer</p>
                    <h2 className="menu-title">Our Menu</h2>
                </div>
                <div className="menu-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${active === cat ? 'active' : ''}`}
                            onClick={() => setActive(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="menu-grid">
                    {filtered.map((item, index) => {
                        const cartItems = cart.find(i => i.id === item.id);
                        return (
                            <div className="menu-card" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <img className="menu-card-img" src={"/menu-references/" + item.source + ".png"} alt={item.name} />
                                <div className="menu-card-body">
                                    <h3 className="menu-card-name">{item.name}</h3>
                                    <p className="menu-card-desc">{item.desc}</p>
                                    <div className="menu-footer-wrapper">
                                        <span className="menu-card-price">${item.price}</span>
                                        {cartItems ?
                                            <div className="item-quantity-wrapper">
                                                <button className="update-quantity-btn" onClick={() => updateCart(item.id, cartItems.quantity - 1)}>-</button>
                                                <p>{cartItems.quantity}</p>
                                                <button className="update-quantity-btn" onClick={() => updateCart(item.id, cartItems.quantity + 1)}>+</button>
                                            </div>
                                            :
                                            <button className="add-item-into-cart" onClick={() => addToCart(item)}>Add to cart</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Menu