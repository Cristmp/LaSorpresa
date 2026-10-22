import { useState, useEffect, useRef } from 'react';
import Logo from '../assets/LaSorpresaLogo.svg';
import { FaBars, FaUser, FaHeart, FaUserGear, FaRightFromBracket } from 'react-icons/fa6';
import LoginModal from './LoginModal';
import { Link, useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import toast from 'react-hot-toast';

const getStoredUserData = () => {
  if (!localStorage.getItem('token')) {
    return { nombre: '', email: '' };
  }

  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    return { nombre: 'Usuario', email: '' };
  }

  try {
    const parsed = JSON.parse(storedUser);
    return {
      nombre: parsed.nombre || 'Usuario',
      email: parsed.correo || parsed.email || ''
    };
  } catch {
    return { nombre: 'Usuario', email: '' };
  }
};

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')));
  const [userData, setUserData] = useState(getStoredUserData);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Cerrar el dropdown de PC al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMobileNavOpen(false);
    navigate('/');
    toast.success('Cierre de sesión exitoso')
  };

  // Función simulada para cuando se loguee exitosamente (puedes pasarla a tu LoginModal)
  const handleLoginSuccess = (userObj) => {
    setIsLoggedIn(true);
    if (userObj) {
      setUserData({
        nombre: userObj.nombre || 'Usuario',
        email: userObj.correo || userObj.email || ''
      });
    }
    closeModals();
  };

  return (
    <>
      {/* Modales */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeModals} />

      {/* Header / Navbar Desktop */}
      <header className="w-full font-poppins h-22 bg-[#22282A] flex justify-between items-center gap-16 px-16 max-lg:px-12 border-b border-[#646D61] fixed top-0 z-150">
        <Link to="/">
          <img src={Logo} className="w-25 mt-4" alt="Logo" />
        </Link>
        
        <div className="w-full flex justify-between items-center max-lg:hidden">
          <section className="flex items-center gap-16 text-white">
            <nav>
              <ul className="flex gap-8 list-none">
                <li className="hover:-translate-y-1 transition-transform duration-200">
                  <Link to="/">Inicio</Link>
                </li>
                <li className="hover:-translate-y-1 transition-transform duration-200">
                  <Link to="/CatalogoPage">Catálogo</Link>
                </li>
                <li className="hover:-translate-y-1 transition-transform duration-200">
                  <Link to="/ofertas">Ofertas</Link>
                </li>
                <li className="hover:-translate-y-1 transition-transform duration-200">
                  <Link to="/personalizacion">Personalización</Link>
                </li>
                <li className="hover:-translate-y-1 transition-transform duration-200">
                  <Link to="/blog">Blog</Link>
                </li>
                <li className="hover:-translate-y-1 transition-transform duration-200">
                  <Link to="/cursos">Cursos</Link>
                </li>
              </ul>
            </nav>
          </section>

          {/* Sección Usuario / Botones en PC */}
          <section className="btns-nav flex items-center gap-4 relative">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                {/* Botón del Perfil */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-[#1e2122] hover:bg-[#2a2e30] border border-[#3a3f42] px-4 py-2 rounded-xl text-white transition-colors cursor-pointer"
                >
                  <div className="h-9 flex items-center justify-center text-white font-semibold">
                    <FaUser size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold leading-tight">{userData.nombre || 'Mi cuenta'}</p>
                  </div>
                </button>

                {/* Dropdown Sidebar Pequeño en PC */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-[#1e2122] border border-[#323333] rounded-xl shadow-2xl py-2 flex flex-col z-50">
                    <div className="px-4 py-2.5 flex flex-col gap-1 border-b border-[#323333] mb-1">
                      <p className="text-sm text-gray-100">Conectado como</p>
                      <p className="text-base font-bold text-white truncate">{userData.nombre}</p>
                      <p className="text-xs text-gray-400 max-w-[130px] mb-2 truncate">{userData.email}</p>
                    </div>

                    <Link
                      to="/favoritos"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#2c3335] transition-colors"
                    >
                      <FaHeart className="text-[#E96324]" size={14} />
                      <span>Favoritos</span>
                    </Link>

                    <Link
                      to="/perfil"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#2c3335] transition-colors"
                    >
                      <FaUserGear className="text-gray-400" size={14} />
                      <span>Perfil del usuario</span>
                    </Link>

                    <div className="border-t border-[#323333] my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full text-left cursor-pointer"
                    >
                      <FaRightFromBracket size={14} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="text-white text-base font-poppins bg-transparent border-none cursor-pointer"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={openRegister}
                  className="bg-[#22282A] text-white border-2 border-white px-6 py-2 rounded-xl font-poppins font-semibold text-base cursor-pointer hover:bg-white hover:text-black transition-colors"
                >
                  Registrarse
                </button>
              </>
            )}
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
          className={`bg-[#1f2223] fixed top-22.5 right-0 p-5 w-80 max-w-[90vw] h-[calc(100vh-5.5rem)] flex flex-col justify-between rounded-l-[15px] shadow-[-5px_5px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 pb-6 ${
            isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enlaces de Navegación Móvil */}
          <ul className="list-none w-full flex flex-col">
            <li className="p-3.5 px-2.5 cursor-pointer hover:bg-[#191D1E]">
              <Link to="/" onClick={() => setIsMobileNavOpen(false)}>Inicio</Link>
            </li>
            <li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">
              <Link to="/CatalogoPage" onClick={() => setIsMobileNavOpen(false)}>Catálogo</Link>
            </li>
            <li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">
              <Link to="/ofertas" onClick={() => setIsMobileNavOpen(false)}>Ofertas</Link>
            </li>
            <li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">
              <Link to="/personalizacion" onClick={() => setIsMobileNavOpen(false)}>Personalización</Link>
            </li>
            <li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">
              <Link to="/blog" onClick={() => setIsMobileNavOpen(false)}>Blog</Link>
            </li>
            <li className="p-3.5 px-2.5 border-t border-[#5f5e5e] cursor-pointer hover:bg-[#191D1E]">
              <Link to="/cursos" onClick={() => setIsMobileNavOpen(false)}>Cursos</Link>
            </li>
          </ul>

          {/* Sección Inferior del Sidebar Móvil */}
          <section className="flex flex-col gap-3 pt-4 border-t border-[#323333]">
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                {/* Info del usuario logueado en móvil */}
                <div className="flex items-center gap-3 p-3 bg-[#151819] rounded-xl border border-[#2d3336]">
                  <div className="w-10 h-10 rounded-full bg-[#E96324] flex items-center justify-center text-white">
                    <FaUser size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{userData.nombre}</p>
                    <p className="text-xs text-gray-400 truncate">{userData.email}</p>
                  </div>
                </div>

                {/* Rutas adicionales de usuario */}
                <Link
                  to="/favoritos"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-[#151819] hover:bg-[#22282A] text-white rounded-xl text-sm transition-colors"
                >
                  <FaHeart className="text-[#E96324]" size={16} />
                  <span>Favoritos</span>
                </Link>

                <Link
                  to="/perfil"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-[#151819] hover:bg-[#22282A] text-white rounded-xl text-sm transition-colors"
                >
                  <FaUserGear className="text-gray-400" size={16} />
                  <span>Perfil del usuario</span>
                </Link>

                {/* Botón Cerrar Sesión */}
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaRightFromBracket size={14} />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            ) : (
              // Botones cuando NO ha iniciado sesión
              <div className="flex flex-col gap-3">
                <button onClick={openLogin} className="text-white cursor-pointer w-full py-3.5 rounded-xl bg-[#E96324] hover:bg-[#c23523] font-medium">
                  Iniciar sesión
                </button>
                <button onClick={openRegister} className="bg-[#22282A] text-white border-2 border-white px-6 py-3 rounded-xl font-semibold cursor-pointer text-base w-full hover:bg-white hover:text-[#22282A] transition-colors">
                  <p>Registrarse</p>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}