import React, { useState, useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function EvaluacionModal({ isOpen, onClose, capituloId, onAprobar }) {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestasUsuario, setRespuestasUsuario] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [guardando, setGuardando] = useState(false); // Estado para evitar doble envío

  // Cargar las preguntas desde el backend cuando se abra el modal
  useEffect(() => {
    if (!isOpen || !capituloId) return;

    const fetchEvaluacion = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`http://localhost:3000/api/capitulos/${capituloId}/evaluacion`);
        
        if (!res.ok) {
          throw new Error('No se pudo cargar la evaluación de este capítulo');
        }

        const data = await res.json();
        setPreguntas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluacion();
    // Reiniciar estados al abrir de nuevo
    setPreguntaActual(0);
    setRespuestasUsuario({});
    setMostrarResultado(false);
    setGuardando(false);
  }, [isOpen, capituloId]);

  if (!isOpen) return null;

  const handleSeleccionarOpcion = (idxOpcion) => {
    setRespuestasUsuario({
      ...respuestasUsuario,
      [preguntaActual]: idxOpcion
    });
  };

  // Calcular puntaje comparando con la propiedad 'respuestaCorrecta' que trae el controlador
  let puntos = 0;
  preguntas.forEach((p, idx) => {
    if (respuestasUsuario[idx] === p.respuestaCorrecta) {
      puntos += 1;
    }
  });

  const aprobado = puntos >= 4; // Se aprueba con 4 o más

  // Función para enviar el intento y el progreso al backend
  const registrarIntentoYProgreso = async (puntajeFinal, esAprobado) => {
    const token = localStorage.getItem('token'); // Recuperamos el token JWT del usuario
    if (!token) {
      toast.error('No hay sesión activa. Por favor, inicia sesión de nuevo.');
      return;
    }

    try {
      setGuardando(true);
      const response = await fetch('http://localhost:3000/api/evaluaciones/intentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          capitulo_id: capituloId,
          puntaje: puntajeFinal,
          aprobado: esAprobado
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al guardar el progreso');

      if (esAprobado) {
        toast.success('¡Evaluación aprobada y progreso guardado!');
      } else {
        toast.error('No alcanzaste el puntaje mínimo. ¡Inténtalo de nuevo!');
      }
    } catch (err) {
      console.error('Error al registrar intento:', err);
      toast.error(err.message || 'Hubo un error de conexión al guardar el intento.');
    } finally {
      setGuardando(false);
    }
  };

  const handleSiguiente = async () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      // Llegamos a la última pregunta, calculamos resultados finales y guardamos en BD
      setMostrarResultado(true);
      await registrarIntentoYProgreso(puntos, aprobado);
    }
  };

  const handleReiniciar = () => {
    setRespuestasUsuario({});
    setPreguntaActual(0);
    setMostrarResultado(false);
    setGuardando(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm font-poppins">
      <div className="bg-[#1e2224] w-full max-w-2xl rounded-2xl border border-[#2d3336] p-6 sm:p-8 relative shadow-2xl text-white">
        
        {/* Botón Cerrar Modal */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white bg-[#151819] p-2 rounded-full cursor-pointer transition-colors"
        >
          <FaXmark size={18} />
        </button>

        {loading ? (
          <div className="py-12 text-center text-gray-400">Cargando evaluación...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-400">{error}</div>
        ) : preguntas.length === 0 ? (
          <div className="py-12 text-center text-gray-400">Este capítulo no cuenta con evaluación disponible.</div>
        ) : !mostrarResultado ? (
          /* VISTA DE PREGUNTAS */
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-[#2d3336] pb-4">
              <span className="text-xs text-gray-400 font-medium">Evaluación del módulo</span>
              <span className="text-xs text-gray-400 font-medium mr-10">Pregunta {preguntaActual + 1} de {preguntas.length}</span>
            </div>

            {/* Líneas de progreso */}
            <div className="grid grid-cols-5 gap-2">
              {preguntas.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full ${idx <= preguntaActual ? 'bg-[#E96324]' : 'bg-[#2a3033]'}`}
                ></div>
              ))}
            </div>

            <h2 className="text-lg sm:text-xl font-playfair font-bold text-white mt-1">
              {preguntas[preguntaActual].enunciado}
            </h2>

            {/* Opciones */}
            <div className="flex flex-col gap-1">
              {preguntas[preguntaActual].opciones.map((opcion, idx) => {
                const seleccionado = respuestasUsuario[preguntaActual] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSeleccionarOpcion(idx)}
                    className={`text-left px-4 py-6 rounded-xl border text-base transition-all cursor-pointer ${
                      seleccionado 
                        ? 'bg-[#E96324] border-[#E96324] text-white font-semibold' 
                        : 'bg-[#151819] border-[#2c3235] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {opcion}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-2">
              <button
                onClick={handleSiguiente}
                disabled={respuestasUsuario[preguntaActual] === undefined || guardando}
                className="bg-[#E96324] hover:bg-[#c84f1a] disabled:opacity-50 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                {guardando ? 'Guardando...' : (preguntaActual === preguntas.length - 1 ? 'Finalizar y ver resultado' : 'Siguiente pregunta')}
              </button>
            </div>
          </div>
        ) : (
          /* VISTA DE RESULTADOS */
          <div className="flex flex-col gap-6">
            <div className="border-b border-[#2d3336] pb-4">
              <h2 className="text-3xl font-playfair font-bold text-white">Resultado</h2>
              <p className="text-sm text-gray-400 mt-1">Puntaje obtenido: {puntos} / {preguntas.length}</p>
            </div>

            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-2">
              {preguntas.map((p, idx) => {
                const esCorrecto = respuestasUsuario[idx] === p.respuestaCorrecta;
                return (
                  <div key={idx} className="bg-[#151819] p-3.5 rounded-xl border border-[#2a2f32] flex justify-between items-center gap-4">
                    <span className="text-base text-gray-300 truncate">{p.enunciado}</span>
                    <span className={`text-sm font-bold px-3 py-3 rounded-lg shrink-0 ${esCorrecto ? 'bg-[#EAFF59] text-black' : 'bg-[#ff5733] text-white'}`}>
                      {esCorrecto ? '1pt' : '-1pt'}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-sm text-gray-300 italic text-center">
              {aprobado ? '¡Genial, has aprobado el módulo!' : 'Buen intento, repasa el video e inténtalo otra vez.'}
            </p>

            <div className="flex gap-4 mt-2">
              {aprobado ? (
                <button
                  onClick={() => {
                    onAprobar();
                    onClose();
                  }}
                  className="w-full bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold py-4 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={handleReiniciar}
                  className="w-full bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold py-4 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Reintentar evaluación
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}