import './Footer.scss'
import logo from '/logo.png'

const Footer = () => {
    return (
        <footer className="footer" id="footer">
            <div className="footer-container">
                <div className="footer-top">

                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src={logo} alt="CoffeeWay logo" />
                            <span>CoffeeWay</span>
                        </div>
                        <p className="footer-tagline">
                            More than just coffee — a place to slow down and enjoy the moment.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Instagram">ig</a>
                            <a href="#" aria-label="TikTok">tk</a>
                            <a href="#" aria-label="Telegram">tg</a>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <h4>Navigation</h4>
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#menu">Menu</a></li>
                            <li><a href="#footer">Contact us</a></li>
                        </ul>
                    </div>

                    <div className="footer-contacts">
                        <h4>Contact us</h4>
                        <ul>
                            <li><a href="https://maps.google.com/?q=123+Coffee+Street+Helsinki" target="_blank">📍 123 Coffee Street, Helsinki</a></li>
                            <li><a href="tel:+358 40 123 4567">📞 +358 40 123 4567</a></li>
                            <li><a href="mailto: hello@coffeeway.fi">✉️ hello@coffeeway.fi</a></li>
                            <li>🕐 Mon–Fri: 8:00–22:00</li>
                            <li>🕐 Sat–Sun: 9:00–20:00</li>
                        </ul>
                    </div>

                    <div className="footer-location">
                        <h4>Find us</h4>
                        <div className="footer-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.5!2d24.9384!3d60.1699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDEwJzExLjYiTiAyNMKwNTYnMTguMyJF!5e0!3m2!1sen!2sfi!4v1"
                                allowFullScreen=""
                                loading="lazy"
                                title="CoffeeWay location"
                            />
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© 2026 CoffeeWay. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer