import './About.scss'
import img1 from '../../assets/about-1.png'
import img2 from '../../assets/about-2.png'
import img3 from '../../assets/about-3.png'

const cards = [
    {
        id: 1,
        img: img1,
        title: 'Espresso',
        description: 'Rich, bold and perfectly balanced — crafted from the finest beans'
    },

    {
        id: 2,
        img: img2,
        title: 'Crafted with love',
        description: 'Every cup is a work of art, made by our passionate baristas'
    },

    {
        id: 3,
        img: img3,
        title: 'Come & Stay',
        description: 'A place to work, relax and enjoy the moment'
    },
]

const About = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-container">
                <div className="about-header">
                    <p className="about-subtitle">Our story</p>
                    <h2 className="about-title">More then just coffee</h2>
                    <p className="about-desc">CoffeeWay is a place where every detail matters — from the beans we source
                        to the way we brew. Come in, slow down and taste the difference.
                    </p>
                </div>
                <div className="about-cards">
                    {cards.map((card) => (
                        <div className="about-card" key={card.id}>
                            <div className="about-card-img">
                                <img src={card.img} alt={card.title} />
                            </div>
                            <h3 className="about-card-title">{card.title}</h3>
                            <p className="about-card-description">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About