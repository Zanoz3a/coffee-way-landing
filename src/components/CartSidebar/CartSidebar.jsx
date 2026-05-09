import { useState } from 'react'
import { useCart } from "../../context/CartContext.jsx"
import "./CartSidebar.scss"
import {useNavigate} from "react-router-dom";

const CartSidebar = ({isOpen}) => {
    const { cart, updateCart, totalItems, totalPrice, toppingTotal } = useCart()
    const [minimized, setMinimized] = useState(false)
    const navigate = useNavigate()

    return (
        <div className={`cart-sidebar ${isOpen ? 'open' : ''} ${minimized ? 'minimized' : ''}`}>
            <div className="sidebar-header">
                <h3>Your order is here!</h3>
                <button
                    className="minimize-sidebar-btn"
                    onClick={() => setMinimized(i => !i)}
                >
                    <span>{minimized ? 'Expand' : 'Minimize'}</span>
                </button>
                <span className="sidebar-count">{totalItems} items</span>
            </div>

            <div className="sidebar-body">
                {cart.map(item => (
                    <div className="sidebar-item" key={item.id}>
                        <img src={`/menu-references/${item.source}.png`} alt={`${item.name}`} />
                        <div className="sidebar-item-info">
                            <h4>{item.name}</h4>
                            <span>${item.price} × {item.quantity}</span>

                        </div>

                        <div className="sidebar-item-controls">
                            <button className="update-quantity-btn" onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="update-quantity-btn" onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sidebar-footer">
                <div className="sidebar-total">
                    <span>Total</span>
                    <span>${totalPrice * 1.1}</span>
                </div>
                <div className="sidebar-footer-buttons">
                    <button
                        className="sidebar-menu-button"
                        onClick={() => navigate('/menu')}
                    >View menu</button>
                    <button
                        className="sidebar-order-button"
                        onClick={() => navigate('/order')}
                    >Proceed to order</button>
                </div>
            </div>
        </div>
    )
}

export default CartSidebar