import React, { useState } from 'react';
import Logo from '../assets/LaSorpresaLogo.svg';
import { FaBars } from 'react-icons/fa6';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal';

export default function Navbar({ externalOpenLogin }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsMobileNavOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsMobileNavOpen(false);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      {/* Modales */}
      <LoginModal isOpen={isLoginOpen} onClose={closeModals} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeModals} />

      {/* Header / Navbar Desktop */}
      <header className="w-full font-poppins h-22 bg-[#22282A] flex justify-between items-center gap-16 px-16 max-lg:px-12 border-b border-[#646D61] fixed top-0 z-150">
        <img src={Logo} className="w-25 mt-4" alt="Logo" />
        
        <div className="w-full flex justify-between max-lg:hidden">
          <section className="flex items-center gap-16 text-white">
            <nav>
              <ul className="flex gap-8 list-none">
                <li className="hover:-translate-y-1 transition-transform duration-200">
                    <Link to={'/'}>
                    Inicio
                    </Link>
                </li>
                <li className="hover:-translate-y-1 transition-transform duration-200 ">
                    <Link to={'/CatalogoPage'}>
                    Catálogo
                    </Link>
                </li>
                <li className="hover:-translate-y-1 transition-transform duration-200"><a href="./Pages/OfertasPage.html" className="text-white no-underline">Ofertas</a></li>
                <li className="hover:-translate-y-1 transition-transform duration-200"><a href="./Pages/PersonalizaciónPage.html" className="text-white no-underline">Personalización</a></li>
                <li className="hover:-translate-y-1 transition-transform duration-200"><a href="./Pages/BlogPage.html" className="text-white no-underline">Blog</a></li>
              </ul>
            </nav>
          </section>

          <section className="flex gap-4 items-center">
            <button onClick={openLogin} className="text-white text-base cursor-pointer hover:text-gray-300">
              Iniciar sesión
            </button>
            <button onClick={openRegister} className="bg-[#22282A] text-white border-2 border-white px-6 py-2 rounded-xl font-semibold cursor-pointer text-base hover:bg-white hover:text-[#22282A] transition-colors">
              <p>Registrarse</p>
            </button>
          </section>
        </div>

        <section className="hidden max-lg:block">
          <button 
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} 
            className="p-3.5 bg-[#1e2122] border border-[#323333] rounded-md cursor-pointer text-white flex items-center justify-center"
          >
            <FaBars size={24} />
          </button>
        </section>
      </header>

      {/* Nav Mobile Overlay & Sidebar */}
      <div 
        className={`fixed inset-0 z-120 bg-black/60 w-full h-full transition-all duration-300 ${
          isMobileNavOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setIsMobileNavOpen(false)}
      >
        <div 
          className={`bg-[#1f2223] fixed top-22.5 right-0 p-5 w-100 max-w-[90vw] h-[calc(100vh-5.5rem)] flex flex-col justify-between rounded-l-[15px] shadow-[-5px_5px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 pb-6 ${
            isMobileNavOpen ? 'translate-x-0' : 'translate-x-120'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="list-none w-full h-50 flex flex-col">
            <a href="./index.html" className="text-white no-underline"><li className="p-3.5 px-2.5 cursor-pointer hover:bg-[#191D1E]">Inicio</li></a>
            <a href="./Pages/CatalogoPage.jsx" className="text-white no-underline"><li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">Catálogo</li></a>
            <a href="./Pages/OfertasPage.html" className="text-white no-underline"><li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">Ofertas</li></a>
            <a href="./Pages/PersonalizaciónPage.html" className="text-white no-underline"><li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">Personalización</li></a>
            <a href="./Pages/BlogPage.html" className="text-white no-underline"><li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">Blog</li></a>
          </ul>

          <section className="flex gap-4 items-center flex-col mb-4">
            <button onClick={openLogin} className="text-white cursor-pointer w-full py-4 rounded-xl bg-[#E96324] hover:bg-[#c23523]">
              Iniciar sesión
            </button>
            <button onClick={openRegister} className="bg-[#22282A] text-white border-2 border-white px-6 py-3 rounded-xl font-semibold cursor-pointer text-base w-full hover:bg-white hover:text-[#22282A] transition-colors">
              <p>Registrarse</p>
            </button>
          </section>
        </div>
      </div>
      
    </>
  );
}