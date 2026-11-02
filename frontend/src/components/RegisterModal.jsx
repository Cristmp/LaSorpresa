import React, { useState } from 'react';
import Logo from '../assets/LaSorpresaLogo.svg';
import { FaXmark } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.correo || !formData.contraseña) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          contraseña: formData.contraseña
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || 'Ocurrió un error al registrar la cuenta');
      }

      toast.success("¡Usuario registrado con éxito!");
      setFormData({ nombre: '', correo: '', contraseña: '', confirmarContraseña: '' });
      onClose();
      
      if (onSwitchToLogin) onSwitchToLogin();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-160 bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300 p-4 overflow-y-auto ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className="bg-[#161B1F] w-full max-w-4xl rounded-2xl text-white shadow-[5px_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col md:flex-row border border-[#2d3336] my-auto"
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
        <div className="hidden md:flex md:w-1/2 relative bg-linear-to-tr from-[#101316] via-[#1a1f24] to-[#E96324]/20 p-10 flex-col justify-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1736143157411-0a70fe999ecb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="" className='absolute object-cover w-full h-full bottom-0 left-0 z-10 blur-[2px]'/>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(233,99,36,0.15))] z-20"></div>
          <div className="relative z-30">
            <h2 className="text-3xl font-playfair font-bold text-white leading-snug">
              Artesanía la sorpresa
            </h2>
            <p className="text-base text-white mt-2">
              Llevamos la cultura nica al mundo digital. Crea tu cuenta y accede a todas las funciones.
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center max-h-[90vh] overflow-y-auto no-scrollbar">
          <div>
            <img src={Logo} className="w-40 mb-4" alt="Logo" />
            <h2 className="text-2xl font-bold font-playfair text-white">Regístrate</h2>
            <p className="text-base text-gray-400 mt-1">Crea una cuenta para acceder a todas las funciones</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg mt-4 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300 font-medium">Nombre</label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre" 
                className="p-3 rounded-xl bg-[#101316] text-white text-sm border border-[#323333] outline-none focus:border-[#E96324] transition-colors"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300 font-medium">Email</label>
              <input 
                type="email" 
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Ej. david385@gmail.com" 
                className="p-3 rounded-xl bg-[#101316] text-white text-sm border border-[#323333] outline-none focus:border-[#E96324] transition-colors"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300 font-medium">Contraseña</label>
              <input 
                type="password" 
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                placeholder="Tu contraseña aquí" 
                className="p-3 rounded-xl bg-[#101316] text-white text-sm border border-[#323333] outline-none focus:border-[#E96324] transition-colors"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300 font-medium">Confirmar contraseña</label>
              <input 
                type="password" 
                name="confirmarContraseña"
                value={formData.confirmarContraseña}
                onChange={handleChange}
                placeholder="Repite tu contraseña" 
                className="p-3 rounded-xl bg-[#101316] text-white text-sm border border-[#323333] outline-none focus:border-[#E96324] transition-colors"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#E96324] hover:bg-[#c84f1a] text-white font-bold text-base transition-colors cursor-pointer mt-2 disabled:opacity-50 shadow-lg shadow-[#E96324]/20"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}