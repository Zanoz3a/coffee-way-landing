import { Routes, Route } from 'react-router-dom';
import './App.scss'

import Home from "./pages/Home/Home.jsx";
import Order from './pages/Order/Order.jsx'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
    </Routes>
  )
}

export default App
