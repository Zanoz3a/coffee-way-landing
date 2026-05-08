import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext.jsx'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import Menu from '../../components/Menu/Menu'
import CTA from '../../components/CTA/CTA'
import Footer from '../../components/Footer/Footer'
import CartSidebar from '../../components/CartSidebar/CartSidebar'

const Home = () => {
    const [showCart, setShowCart] = useState(false)
    const { totalItems } = useCart()

    useEffect(() => {
        const menuSection = document.querySelector('#menu')
        const observer = new IntersectionObserver(
            ([entry]) => setShowCart(entry.isIntersecting),
            { threshold: 0.1 }
        )
        if (menuSection) observer.observe(menuSection)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Menu />
            <CTA />
            <Footer />
            <CartSidebar isOpen={showCart && totalItems > 0} />
        </>
    )
}

export default Home