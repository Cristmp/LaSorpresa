import React, { useState } from 'react';
import Logo from '../assets/LaSorpresaLogo.svg';
import { FaXmark } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  // 1. Estados para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  // Estados para retroalimentación al usuario
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Manejador para actualizar los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpia el error cuando el usuario empieza a escribir
  };

  // 2. Función de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica en el frontend
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
      // Petición POST a tu endpoint de registro
      const response = await fetch('http://localhost:3000/api/registro', { // Cambia la URL según la ruta de tu API
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

      // Éxito: Limpiar formulario y cerrar/redirigir
      toast.success("Usuario registrado con exito!")
      setFormData({ nombre: '', correo: '', contraseña: '', confirmarContraseña: '' });
      onClose();
      
      // Opcional: Redirigir al modal de inicio de sesión automáticamente
      if (onSwitchToLogin) onSwitchToLogin();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-160 bg-black/40 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 visible animate-fadeIn' : 'opacity-0 invisible pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className="bg-[#161B1F] max-w-135 max-lg:max-w-112.5 w-full h-auto p-5 px-12 rounded-xl text-white shadow-[5px_10px_30px_rgba(0,0,0,1)] relative flex flex-col my-8"
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
          <h2 className="text-2xl font-semibold mt-2">Regístrate</h2>
          <p className="text-sm text-gray-400 mt-1">Crea una cuenta para acceder a todas las funciones</p>
        </div>

        {/* Mensaje de error si falla la validación o petición */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg mt-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 border-t border-[#323333] pt-5 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nombre</label>
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre" 
              className="p-3 px-5 rounded-lg bg-[#101316] text-white border border-[#323333] outline-none focus:border-[#646D61]"
              required
            />
            
            <label className="text-sm mt-1">Email</label>
            <input 
              type="email" 
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Tu correo electrónico aquí" 
              className="p-3 px-5 rounded-lg bg-[#101316] text-white border border-[#323333] outline-none focus:border-[#646D61]"
              required
            />
            
            <label className="text-sm mt-1">Contraseña</label>
            <input 
              type="password" 
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Tu contraseña aquí" 
              className="p-3 px-5 rounded-lg bg-[#101316] text-white border border-[#323333] outline-none focus:border-[#646D61]"
              required
            />
            
            <label className="text-sm mt-1">Confirmar contraseña</label>
            <input 
              type="password" 
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              placeholder="Repite tu contraseña" 
              className="p-3 px-5 rounded-lg bg-[#101316] text-white border border-[#323333] outline-none focus:border-[#646D61]"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 px-1.5 rounded-xl bg-[#E96324] hover:bg-[#9e2611] text-white font-medium transition-colors cursor-pointer mt-2 disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}