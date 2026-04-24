import './App.scss'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Menu from './components/Menu/Menu'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'


function App() {

  return (
    <>
        {/*Тест тест*/}
        {/*testing*/}
        {/*<ul>Name list*/}
        {/*    <li>1st</li>*/}
        {/*    <li>2nd</li>*/}
        {/*    <li>3rd</li>*/}
        {/*    <li><a href="/">link name</a></li>*/}
        {/*</ul>*/}
        {/*<img src="logo.png" alt="logo"/>*/}

        <Navbar />
        <Hero />
        <About />
        <Menu />
        <CTA />
        <Footer />
    </>
  )
}

export default App
