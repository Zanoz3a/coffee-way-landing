import { Routes, Route } from 'react-router-dom';
import './App.scss'

import HomePage from "./pages/HomePage/HomePage.jsx";
import MenuPage from "./pages/MenuPage/MenuPage.jsx";
import OrderPage from './pages/OrderPage/OrderPage.jsx'

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
    </Routes>
  )
}

export default App
