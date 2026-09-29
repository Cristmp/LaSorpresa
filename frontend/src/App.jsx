import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'
import Footer from './components/footer.jsx'
import CatalogoPage from './pages/CatalogoPage.jsx'

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/CatalogoPage' element={<CatalogoPage/>}/>
        </Routes>   
        <Footer/>   
    </div>
  )
}

export default App
