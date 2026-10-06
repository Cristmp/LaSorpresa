import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'
import Footer from './components/footer.jsx'
import CatalogoPage from './pages/CatalogoPage.jsx'
import InfoProductPage from './pages/InfoProductPage.jsx'
import PersonalizacionPage from './pages/PersonalizacionPage.jsx'
import OfertasPage from './pages/OfertasPage.jsx'
import CursosPage from './pages/CursosPage.jsx'
import BlogPage from './pages/BlogPage.jsx'

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/CatalogoPage' element={<CatalogoPage/>}/>
          <Route path='/productos/:id' element={<InfoProductPage/>}/>
          <Route path='/personalizacion' element={<PersonalizacionPage/>}/>
          <Route path='/ofertas' element={<OfertasPage/>}/>
          <Route path='/blog' element={<BlogPage/>}/>
          <Route path='/cursos' element={<CursosPage/>}/>
        </Routes>   
        <Footer/>   
    </div>
  )
}

export default App
