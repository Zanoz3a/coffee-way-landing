import './MenuPage.scss'
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
    const navigate = useNavigate();
    return (
        <>
            Menu page
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/order")}>Proceed to order</button>
        </>
    )
}

export default MenuPage;