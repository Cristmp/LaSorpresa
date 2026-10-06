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
      onLoginSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-160 bg-black/40 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className="bg-[#161B1F] max-w-135 max-lg:max-w-112.5 w-full h-137.5 p-5 px-12 rounded-xl text-white shadow-[5px_10px_30px_rgba(0,0,0,1)] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute text-[#5f5e5e] p-2.5 top-0 right-0 cursor-pointer m-4 hover:text-white transition-colors"
        >
          <FaXmark size={24} />
        </button>

        <div>
          <img src={Logo} className="w-37.5 mt-8" alt="Logo" />
          <h2 className="text-2xl font-semibold mt-2">Iniciar sesión</h2>
          <p className="text-sm text-gray-400 mt-1">Accede a tu cuenta para acceder a todas las funciones</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg mt-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 border-t border-[#323333] pt-5 h-[60%] flex flex-col justify-around">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm">Email</label>
            <input 
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Tu correo electrónico aquí" 
              className="p-3.5 px-5 rounded-lg bg-[#101316] text-white border border-[#323333] outline-none focus:border-[#646D61]"
              required
            />
            <label className="text-sm mt-2">Contraseña</label>
            <input 
              type="password" 
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Tu contraseña aquí" 
              className="p-3.5 px-5 rounded-lg bg-[#101316] text-white border border-[#323333] outline-none focus:border-[#646D61]"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 px-1.5 rounded-xl bg-[#E96324] hover:bg-[#9e2611] text-white font-medium transition-colors cursor-pointer disabled:opacity-50">
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
  
}