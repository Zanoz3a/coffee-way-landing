import { useState, useEffect } from "react";

import './Navbar.scss'
import logo from '/logo.png'
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [scroll, setScroll] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`navbar ${scroll ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="/" className="nav-brand">
                    <img src={logo} alt="CoffeeWay logo" className="nav-logo"/>
                    <span className="nav-name">CoffeeWay</span>
                </a>
                <ul className="nav-links">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="#footer">Contact us</a></li>
                </ul>
                <button
                    className="nav-order-btn"
                    onClick={() => navigate('/menu')}
                >Make an order</button>
            </div>
        </nav>
    )
}

export default Navbar