import {useEffect, useState} from 'react';
import { useCart } from '../../context/CartContext.jsx'
import './OrderPage.scss'
import {useNavigate} from "react-router-dom";

const milkOptions = ['Cow', 'Skim', 'Lactose-free', 'Oat', 'Almond', 'Soy']
const syrupTastes = ['Vanilla', 'Caramel', 'Hazelnut', 'Chocolate', 'Almond', 'Blue curacao', 'Raspberry', 'Mint']
const bubbleTeaBase = [
    { name: 'Tapioca pearls' },
    { name: 'Juice balls', price: '0.50' },
    { name: 'Jelly balls', price: '0.30' },
    { name: 'Lychee jelly', price: '0.30' },
]

const coffeeToppings = [
    { name: 'Chocolate chips', price: '0.80' },
    { name: 'Marshmallow', price: '0.90' },
    { name: 'Honey', price: '0.70' },
    { name: 'Whipped cream', price: '1.00' },
    { name: 'Cinnamon', price: '0.40' },
    { name: 'Espresso shot', price: '1.20' },
    { name: 'Syrup', price: '0.50', taste: syrupTastes }
]

const bubbleTeaToppings = [
    { name: 'Extra tapioca pearls', price: '1.20' },
    { name: 'Extra juice balls', price: '1.50' },
    { name: 'Extra jelly balls', price: '1.00' },
    { name: 'Extra lychee jelly', price: '1.00' },
    { name: 'Fruit bits', price: '0.70' },
    { name: 'Aloe vera', price: '1.20' },
]

const dessertToppings = [
    { name: 'Whipped cream', price: '1.00' },
    { name: 'Nutella', price: '1.70' },
    { name: 'Chocolate chips', price: '0.80' },
    { name: 'Honey', price: '0.70' },
    { name: 'Cinnamon', price: '0.40' },
    { name: 'Powdered sugar', price: '0.50' },
    { name: 'Fresh berries', price: '1.80' },
    { name: 'Ice cream scoop', price: '1.40' },
]

const iceCreamToppings = [
    { name: 'Chocolate chips', price: '0.80' },
    { name: 'Oreo crumbs', price: '1.10' },
    { name: 'Sprinkles', price: '0.70' },
    { name: 'Brownie chunks', price: '1.70' },
    { name: 'Syrup', price: '0.50', taste: syrupTastes }
]

const cocktailToppings = [
    { name: 'Chocolate chips', price: 0.80 },
    { name: 'Oreo crumbs', price: 1.10 },
    { name: 'Whipped cream', price: 1.00 },
    { name: 'Sprinkles', price: 0.70 },
    { name: 'Fresh strawberries', price: 1.80 },
    { name: 'Brownie chunks', price: 1.70 },
    { name: 'Mini marshmallows', price: 0.80 },
    { name: 'Cinnamon', price: 0.40 },
]

const paymentOptions = ['Card', 'Apple Pay', 'Google Pay', 'Cash']

const OrderItem = ({ item }) => {
    const { updateCart, removeFromCart, updateItemToppings } = useCart()
    const [milk, setMilk] = useState('Cow')
    const [BTBase, setBTBase] = useState('Tapioca pearls')
    const [topping, setTopping] = useState([])

    const [milkOpen, setMilkOpen] = useState(false)
    const [BTBaseOpen, setBTBaseOpen] = useState(false)
    const [toppingOpen, setToppingOpen] = useState(false)
    const [syrupOpen, setSyrupOpen] = useState(false)

    const [selectedSyrup, setSelectedSyrup] = useState([])

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

    const toggleSyrup = (syrup) => {
        setSelectedSyrup(list =>
            list.includes(syrup)
                ? list.filter(s => s !== syrup)
                : [...list, syrup]
        )

        setTopping(list =>
            list.includes(syrup + ' syrup')
                ? list.filter(s => s !== syrup + ' syrup')
                : [...list, syrup + ' syrup']
        )
    }

    const getToppingCategory = (category) => {
        switch(category) {
            case 'Coffee': return coffeeToppings;
            case 'Bubble Tea': return bubbleTeaToppings;
            case 'Desserts': return dessertToppings;
            case 'Soft Ice Cream': return iceCreamToppings;
            default: return [];
        }
    }

    useEffect(() => {
        const allToppings = getToppingCategory(item.category)

        const toppingPrice = topping.reduce((sum, name) => {
            const found = allToppings.find(t => t.name === name || name.includes(t.name))
            return sum + (found ? Number(found.price) : 0)
        }, 0)

        const syrupsPrice = selectedSyrup.length > 0
            ? Number(allToppings.find(t => t.taste)?.price || 0) * selectedSyrup.length
            : 0

        const BTBasePrice = item.category === 'Bubble Tea'
            ? Number(bubbleTeaBase.find(t => t.name === BTBase)?.price || 0)
            : 0

        updateItemToppings(item.id, topping, toppingPrice + syrupsPrice + BTBasePrice)
    }, [topping, selectedSyrup, BTBase])

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

                        {item.category === 'Bubble Tea' && (
                            <>
                                <div
                                    className="order-dropdown"
                                    onClick={() => setBTBaseOpen(prev => !prev)}
                                >
                                    <span>Base topping</span>
                                    <span>{BTBase} ▾</span>
                                </div>
                                {BTBaseOpen && (
                                    <div className="order-dropdown-body">
                                        {bubbleTeaBase.map(base => (
                                            <label key={base.name}>
                                                <input
                                                    type="radio"
                                                    name={`base-${item.id}`}
                                                    checked={BTBase === base.name}
                                                    onChange={() => setBTBase(base.name)}
                                                />
                                                <div className="dropdown-topping-container">
                                                    <span className="dropdown-topping-name">{base.name}</span>
                                                    <span className="dropdown-topping-price">{base.price && `+$${base.price}`}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        <div className="order-dropdown" onClick={() => setToppingOpen(prev => !prev)}>
                            <span>Toppings</span>
                            <span>{topping.length > 0 ? topping.join(', ') : 'None'} ▾</span>
                        </div>
                        {toppingOpen && (
                            <div className="order-dropdown-body">
                                {getToppingCategory(item.category).map(option => (
                                    option.taste ? (
                                    <div key={option.name}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedSyrup.length > 0}
                                                onChange={() => toggleTopping(option)}
                                            />
                                            <div className="dropdown-topping-container">
                                                <span>{option.name}</span> <span>{option.price && `+$${option.price} for each`}</span>
                                            </div>
                                        </label>
                                        {syrupOpen && (
                                            <div className="syrup-options">
                                                {option.taste.map(syrup => (
                                                    <label key={syrup}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSyrup.includes(syrup)}
                                                            onChange={() => toggleSyrup(syrup)}
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
                                            <div className="dropdown-topping-container">
                                                <span className="dropdown-topping-name">{option.name}</span>
                                                <span className="dropdown-topping-price">+${option.price}</span>
                                            </div>
                                        </label>
                                    )
                                ))}
                            </div>
                        )}
                    </>
                ) : (item.category !== 'Drip Bags' && (
                    <>
                        <div className="order-dropdown" onClick={() => setToppingOpen(prev => !prev)}>
                            <span>Extras</span>
                            <span>{topping.length > 0 ? topping.join(', ') : 'None'} ▾</span>
                        </div>
                        {toppingOpen && (
                            <div className="order-dropdown-body">
                                {getToppingCategory(item.category).map(option => (
                                    option.taste ? (
                                        <div key={option.name}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSyrup.length > 0}
                                                    onChange={() => toggleTopping(option)}
                                                />
                                                <div className="dropdown-topping-container">
                                                    <span>{option.name}</span> <span>{option.price && `+$${option.price} for each`}</span>
                                                </div>
                                            </label>
                                            {syrupOpen && (
                                                <div className="syrup-options">
                                                    {option.taste.map(syrup => (
                                                        <label key={syrup}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedSyrup.includes(syrup)}
                                                                onChange={() => toggleSyrup(syrup)}
                                                            />
                                                            {syrup}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        ) : (
                                            <label key={option.name}>
                                                <input
                                                    type="checkbox"
                                                    checked={topping.includes(option.name)}
                                                    onChange={() => toggleTopping(option)}
                                                />
                                                <div className="dropdown-topping-container">
                                                    <span className="dropdown-topping-name">{option.name}</span>
                                                    <span className="dropdown-topping-price">+${option.price}</span>
                                                </div>
                                            </label>
                                        )
                                ))}
                            </div>
                        )}


                    </>
                ))}
            </div>
        </div>
    )
}

const OrderPage = () => {
    const { cart, totalPrice, toppingTotal} = useCart()
    const [orderType, setOrderType] = useState('Takeaway')
    const [payment, setPayment] = useState('Card')
    const [orderComment, setOrderComment] = useState(() => {
        return localStorage.getItem('orderComment') || ''
    })
    const navigate = useNavigate()

    const subtotal = Number(totalPrice) + Number(toppingTotal)
    const tax = (subtotal * 0.1).toFixed(2)
    const total = (subtotal * 1.1).toFixed(2)

    console.log(subtotal)
    return (
        <div className="order-page">
            <div className="navigation-container">
                <button
                    className="home-page-button"
                    onClick={() => navigate('/')}>Home page</button>
                <button
                    className="menu-page-button"
                    onClick={() => navigate('/menu')}>Menu</button>
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
                        value={orderComment}
                        onChange={(e) => {
                            setOrderComment(e.target.value)
                            localStorage.setItem('orderComment', e.target.value)
                        }}
                    />
                </div>

                <div className="order-payment">
                    <h2>Payment method</h2>
                    <div className="payment-options-container">
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
                </div>

                <div className="order-summary">
                    <div className="order-summary-row">
                        <span>Subtotal</span>
                        <span>${Number(subtotal).toFixed(2)}</span>
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

export default OrderPage

const cart = [
    {
        name: 'latte',
        info: {
            id: 1,
            structure: {
                milk: "Oat",
                toppings: ['espresso shot', 'marshmallow'],
                cupsize: 'small'
            }
        }
    },
    {
        name: 'matcha latte',
        info: {
            id: 1,
            structure: {
                milk: "Skim",
                basetopping: 'tapioca',
                toppings: ['extra tapioca', 'aloe'],
                cupsize: 'big'
            }
        }
    },
]