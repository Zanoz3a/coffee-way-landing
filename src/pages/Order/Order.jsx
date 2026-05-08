import { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx'
import './Order.scss'

const milkOptions = ['Cow', 'Lactose-free', 'Oat', 'Almond', 'Soy']
const toppingOptions = [
    { name: 'Tapioca pearls' },
    { name: 'Jelly balls' },
    { name: 'Chocolate chips' },
    { name: 'Marshmallow' },
    { name: 'Honey' },
    { name: 'Whipped cream' },
    { name: 'Cinnamon' },
    {
        name: 'Syrup',
        taste: [
            'Vanilla',
            'Caramel',
            'Hazelnut',
            'Chocolate',
            'Salted caramel',
            'Irish cream',
            'Almond',
            'Blue curacao',
            'Banana',
            'Strawberry',
            'Raspberry',
            'Mint',
            'Maple',
            'Toffifee',
            'Oreo',
            'Lavender'
        ]
    }
]
const paymentOptions = ['Card', 'Apple Pay', 'Google Pay', 'Cash']

const OrderItem = ({ item }) => {
    const { updateCart, removeFromCart } = useCart()
    const [milk, setMilk] = useState('Cow')
    const [topping, setTopping] = useState([])
    const [milkOpen, setMilkOpen] = useState(false)
    const [toppingOpen, setToppingOpen] = useState(false)
    const [syrupOpen, setSyrupOpen] = useState(false)
    const [selectedSyrup, setSelectedSyrup] = useState(null)

    const toggleTopping = (topping) => {
        if (topping.taste) {
            setSyrupOpen(prev => !prev)
            return
        }

        setTopping(list =>
            list.includes(topping.name)
                ? list.filter(t => t !== topping.name)
                : [...list, topping.name]
        )
    }

    return (
        <div className="order-item">
            <img src={`/menu-references/${item.source}.png`} alt={item.name} />
            <div className="order-item-content">
                <div className="order-item-header">
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                        <span className="order-item-price">${item.price}</span>
                    </div>
                    <div className="order-item-controls">
                        <button onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                        <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
                    </div>
                </div>

                {item.category === 'Coffee' || item.category === 'Bubble Tea' ? (
                    <>
                        <div className="order-dropdown" onClick={() => setMilkOpen(prev => !prev)}>
                            <span>Milk options</span>
                            <span>{milk} ▾</span>
                        </div>
                        {milkOpen && (
                            <div className="order-dropdown-body">
                                {milkOptions.map(option => (
                                        <label key={option}>
                                            <input
                                                type="radio"
                                                name={`milk-${item.id}`}
                                                checked={milk === option}
                                                onChange={() => setMilk(option)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                            </div>
                        )}

                        <div className="order-dropdown" onClick={() => setToppingOpen(prev => !prev)}>
                            <span>Toppings</span>
                            <span>{topping.length > 0 ? topping.join(', ') : 'None'} ▾</span>
                        </div>
                        {toppingOpen && (
                            <div className="order-dropdown-body">
                                {toppingOptions.map(option => (
                                    option.taste ? (
                                    <div key={option.name}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={topping.includes(option.name)}
                                                onChange={() => toggleTopping(option.name)}
                                            />
                                            {option.name}
                                        </label>
                                        {syrupOpen && (
                                            <div className="syrup-options">
                                                {option.taste.map(syrup => (
                                                    <label key={syrup}>
                                                        <input
                                                            type="radio"
                                                            name={`syrup-${item.id}`}
                                                            checked={selectedSyrup === syrup}
                                                            onChange={() => setSelectedSyrup(syrup)}
                                                        />
                                                        {syrup}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                                :
                                    (
                                        <label key={option.name}>
                                            <input
                                                type="checkbox"
                                                checked={topping.includes(option.name)}
                                                onChange={() => toggleTopping(option)}
                                            />
                                            {option.name}
                                        </label>
                                    )
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="order-dropdown" onClick={() => setToppingOpen(prev => !prev)}>
                        <span>Add extras</span>
                        <span>{topping.length > 0 ? topping.join(', ') : 'No extras'} ▾</span>
                    </div>
                )}
            </div>
        </div>
    )
}

const Order = () => {
    const { cart, totalPrice } = useCart()
    const [orderType, setOrderType] = useState('Takeaway')
    const [payment, setPayment] = useState('Card')
    const [orderComment, setOrderComment] = useState(() => {
        return localStorage.getItem('orderComment') || ''
    })

    const tax = (totalPrice * 0.1).toFixed(2)
    const total = (totalPrice * 1.1).toFixed(2)

    return (
        <div className="order-page">
            <div className="navigation-container">
                <button>Home page</button>
                <button>Menu</button>
            </div>

            <div className="order-container">
                <h1 className="order-title">Your order</h1>

                <div className="order-type">
                    {['Takeaway', 'Dine in'].map(type => (
                        <button
                            key={type}
                            className={orderType === type ? 'active' : ''}
                            onClick={() => setOrderType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="order-items">
                    {cart.map(item => (
                        <OrderItem key={item.id} item={item} />
                    ))}
                </div>

                <div className="order-comments">
                    <label htmlFor="comment-input">
                        <h3>Comments to the order</h3>
                    </label>
                    <input
                        type="text"
                        id="comment-input"
                        placeholder="Make my latte cold🥶🥶"
                        value={
                        orderComment}
                        onChange={(e) => {
                            setOrderComment(e.target.value)
                            localStorage.setItem('orderComment', e.target.value)
                        }}
                    />
                </div>

                <div className="order-payment">
                    <h2>Payment method</h2>
                    {paymentOptions.map(option => (
                        <label key={option} className={`payment-option ${payment === option ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="payment"
                                checked={payment === option}
                                onChange={() => setPayment(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div className="order-summary">
                    <div className="order-summary-row">
                        <span>Subtotal</span>
                        <span>${Number(totalPrice).toFixed(2)}</span>
                    </div>
                    <div className="order-summary-row">
                        <span>Tax</span>
                        <span>${tax}</span>
                    </div>
                    <div className="order-summary-row total">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <button className="confirm-btn">Confirm order</button>
                </div>
            </div>
        </div>
    )
}

export default Order