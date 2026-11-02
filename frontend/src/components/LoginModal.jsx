import { useState } from 'react';
import Logo from '../assets/LaSorpresaLogo.svg';
import { FaXmark } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({ correo: '', contraseña: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo iniciar sesión.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setFormData({ correo: '', contraseña: '' });
      toast.success(data.message || 'Inicio de sesión exitoso');
      onLoginSuccess?.(data.user);
      onClose();
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-160 bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300 p-4 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className="bg-[#161B1F] w-full max-w-4xl rounded-2xl text-white shadow-[5px_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col md:flex-row border border-[#2d3336]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar Global */}
        <button 
          onClick={onClose}
          className="absolute text-gray-400 p-3 top-2 right-2 z-20 cursor-pointer hover:text-white transition-colors"
        >
          <FaXmark size={22} />
        </button>

        {/* COLUMNA IZQUIERDA: DISEÑO VISUAL */}
        <div className="hidden md:flex md:w-1/2 relative bg-linear-to-br from-[#101316] via-[#1a1f24] to-[#E96324]/20 p-10 flex-col justify-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1609881582722-4a8ab7cd54d8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="" className='absolute object-cover w-full h-full bottom-0 left-0 z-10'/>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(233,99,36,0.15),transparent_50%)]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-playfair font-bold text-white leading-9">
              Te esperan las funciones más geniales
            </h2>
            <p className="text-base text-white mt-2">
              Explora cursos, comparte tus creaciones y sé parte de la comunidad artesanal.
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <div className='py-4 border-b border-[#262c31]'>
            <img src={Logo} className="w-40 mb-4" alt="Logo" />
            <h2 className="text-2xl font-bold font-playfair text-white">Iniciar sesión</h2>
            <p className="text-base text-gray-400 mt-1">Accede a tu cuenta para comenzar a navegar</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg mt-4 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300 font-medium">Email</label>
              <input 
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Ej. david385@gmail.com" 
                className="p-3.5 rounded-xl bg-[#101316] text-white text-sm border border-[#323333] outline-none focus:border-[#E96324] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300 font-medium">Contraseña</label>
              <input 
                type="password" 
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                placeholder="Tu contraseña aquí" 
                className="p-3.5 rounded-xl bg-[#101316] text-white text-sm border border-[#323333] outline-none focus:border-[#E96324] transition-colors"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3.5 rounded-xl bg-[#E96324] hover:bg-[#c84f1a] text-white font-bold text-base transition-colors cursor-pointer disabled:opacity-50 mt-2 shadow-lg shadow-[#E96324]/20"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}