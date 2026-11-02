import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaChevronLeft, 
  FaCircleCheck,
  FaLock,
  FaFilePdf
} from 'react-icons/fa6';
import { RiMedalLine } from "react-icons/ri";
import EvaluacionModal from '../components/EvaluacionModal';
import toast from 'react-hot-toast';

export default function ContenidoCursoPage() {
  const { id } = useParams(); // ID del curso actual
  const navigate = useNavigate();

  // Estados de carga y error para la BD
  const [capitulos, setCapitulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados del módulo de contenido y evaluación
  const [capituloActualIndex, setCapituloActualIndex] = useState(1); // Empezamos en el índice 1 (Materiales) por defecto
  const [isEvaluacionOpen, setIsEvaluacionOpen] = useState(false);

  // 1. Cargar capítulos de la base de datos de manera dinámica
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const fetchCapitulos = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(`http://localhost:3000/api/cursos/${id}/capitulos`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('No se pudieron cargar los capítulos del curso.');

        const capitulosDB = await response.json();
        if (!Array.isArray(capitulosDB)) {
          throw new Error('La respuesta de capítulos no tiene un formato válido.');
        }

        let progreso = [];
        if (token) {
          const progresoResponse = await fetch(`http://localhost:3000/api/cursos/${id}/progreso`, {
            headers,
            signal: controller.signal,
          });
          if (!progresoResponse.ok) {
            throw new Error('No se pudo cargar el progreso guardado del curso.');
          }

          progreso = await progresoResponse.json();
          if (!Array.isArray(progreso)) {
            throw new Error('La respuesta de progreso no tiene un formato válido.');
          }
        }

        const capitulosCompletados = new Set(
          progreso
            .filter((registro) => Number(registro.completado) === 1)
            .map((registro) => String(registro.capitulo_id))
        );

        const capitulosMapeados = capitulosDB.map((cap, index) => ({
          ...cap,
          bloqueado: index > 1 && !capitulosCompletados.has(String(capitulosDB[index - 1]?.id)),
          completado: index === 0 || capitulosCompletados.has(String(cap.id)),
          guiaPdf: cap.pdf_url ? {nombre: decodeURIComponent(
            new URL(cap.pdf_url, window.location.origin).pathname.split('/').pop()
            ),
            url: cap.pdf_url,} : null
        }));

        setCapitulos(capitulosMapeados);

        // Si hay al menos 2 capítulos, seleccionamos el segundo ("Materiales") por defecto
        if (capitulosMapeados.length > 1) {
          setCapituloActualIndex(1);
        } else {
          setCapituloActualIndex(0);
        }

      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('Error al cargar los capítulos y el progreso:', err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCapitulos();
    return () => controller.abort();
  }, [id]);

  // Manejador que se ejecuta al aprobar el examen en el modal
  const handleAprobarEvaluacion = () => {
    const nuevosCapitulos = [...capitulos];
    nuevosCapitulos[capituloActualIndex].completado = true;
    
    // Desbloquear el siguiente capítulo si existe
    if (capituloActualIndex + 1 < nuevosCapitulos.length) {
      nuevosCapitulos[capituloActualIndex + 1].bloqueado = false;
    }
    setCapitulos(nuevosCapitulos);
  };

  if (loading) {
    return (
      <div className="bg-[#181c1e] min-h-screen text-white flex items-center justify-center font-poppins">
        <p className="text-lg font-medium">Cargando contenido del curso...</p>
      </div>
    );
  }

  if (error || capitulos.length === 0) {
    return (
      <div className="bg-[#181c1e] min-h-screen text-white flex flex-col items-center justify-center font-poppins gap-4">
        <p className="text-red-400 font-medium">{error || 'No hay capítulos disponibles para este curso.'}</p>
        <button onClick={() => navigate(-1)} className="bg-[#E96324] text-white px-6 py-2.5 rounded-xl text-sm">
          Regresar
        </button>
      </div>
    );
  }

  const capituloActual = capitulos[capituloActualIndex];

  return (
    <div className="bg-[#181c1e] min-h-screen mt-12 text-white pt-24 pb-16 font-poppins selection:bg-[#E96324] selection:text-white">
      <main className="max-w-7xl mx-auto px-6">
        
        {/* MODAL DE EVALUACIÓN FLOTANTE */}
        <EvaluacionModal 
          isOpen={isEvaluacionOpen}
          onClose={() => setIsEvaluacionOpen(false)}
          capituloId={capituloActual?.id}
          onAprobar={handleAprobarEvaluacion}
        />

        {/* BOTÓN REGRESAR A INFORMACIÓN DEL CURSO */}
        <button 
          onClick={() => navigate(`/cursos/${id}`)}
          className="flex items-center gap-2 border border-[#3a4246] hover:bg-[#22282a] text-gray-200 text-base px-6 py-3 rounded-full mb-6 transition-colors cursor-pointer"
        >
          <FaChevronLeft size={12} />
          <span>Regresar al curso</span>
        </button>

        {/* ENCABEZADO */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-1">
              {capituloActual.titulo}
            </h1>
            <p className="text-sm text-gray-400">Crea la sorpresa - Marina Toruño</p>
          </div>

          <div className="bg-[#242a2d] p-3 rounded-2xl hidden sm:flex items-center justify-center text-gray-300">
            <RiMedalLine size={34}/>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL Y MÓDULOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ZONA IZQUIERDA: REPRODUCTOR LOCAL */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Reproduciendo: {capituloActual.titulo}</p>
              
              <div className="relative w-full h-80 sm:h-105 bg-[#121516] rounded-2xl overflow-hidden border border-[#2d3336]">
                <video 
                  key={capituloActual.video_url}
                  src={capituloActual.video_url}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Tu navegador no soporta la reproducción de video local.
                </video>
              </div>
            </div>

            {/* GUÍA PDF ADJUNTA */}
            {capituloActual.guiaPdf && (
              <div className="group bg-[#1e2224] p-4 rounded-xl border border-[#2d3336] relative flex items-center justify-between">
                <img
                  src="/images/Margarita-pdf.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none w-50 absolute left-135 -top-10 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                />
                <div className="flex items-center gap-3">
                  <div className="bg-[#E96324]/20 p-3 rounded-lg text-[#E96324]">
                    <FaFilePdf size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Descargar guía</h4>
                    <p className="text-xs text-gray-400">{capituloActual.guiaPdf.nombre}</p>
                  </div>
                </div>
                <a 
                  href={capituloActual.guiaPdf.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2a3033] hover:bg-[#E96324] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                  Descargar
                </a>
              </div>
            )}

            {/* DESCRIPCIÓN DINÁMICA */}
            <div className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl relative border border-[#2d3336]">
              <h2 className="text-xl font-semibold text-white mb-4">Descripción</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{capituloActual.descripcion}</p>
            </div>
          </div>

          {/* ZONA DERECHA: ÍNDICE DE MÓDULOS DINÁMICO */}
          <aside className="flex flex-col gap-6">
            <div className="bg-[#1e2224] p-6 rounded-2xl border border-[#2d3336] sticky top-30 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Índice de módulos</h3>
                
                <div className="flex flex-col gap-2 max-h-96 overflow-y-auto no-scrollbar pr-1">
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-3 bg-[#151819] p-3.5 rounded-lg border-l-4 border-[#E96324]">
                      <span className="w-8 h-8 rounded-full bg-[#E96324] text-white text-sm font-bold flex items-center justify-center">
                        M1
                      </span>
                      <span className="font-bold text-base text-white">Pulseras</span>
                    </div>

                    <div className="flex flex-col gap-1 pl-4">
                      {capitulos.map((cap, idx) => {
                        const esSeleccionado = capituloActualIndex === idx;
                        return (
                          <div
                            key={cap.id}
                            onClick={() => {
                              if (!cap.bloqueado) {
                                setCapituloActualIndex(idx);
                              }
                            }}
                            className={`flex items-center gap-3 py-4 px-4 text-sm border-b hover:bg-[#2a2f32] border-[#2a2f32] transition-colors ${
                              cap.bloqueado
                                ? 'opacity-40 cursor-not-allowed'
                                : esSeleccionado
                                  ? 'text-white bg-[#131618]'
                                  : 'text-gray-300 cursor-pointer hover:text-white px-4 hover:bg-[#2a2f32]'
                            }`}
                          >
                            {cap.completado ? (
                              <FaCircleCheck className="text-[#a8e02c] shrink-0" size={20} />
                            ) : cap.bloqueado ? (
                              <FaLock className="text-gray-500 shrink-0" size={20} />
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-[#2a2f32] text-gray-300 text-sm flex items-center justify-center shrink-0">
                                <span className="w-4 h-4 rounded-full border-2 border-gray-400"></span>
                              </div>
                            )}
                            <span className="font-medium">{cap.titulo}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2d3336] flex flex-col gap-3">
                {/* BOTÓN PARA ABRIR EL MODAL (Validando que no sea el cap 0 introductorio) */}
                <button 
                  onClick={() => {
                    if (capituloActualIndex === 0) {
                      alert('Este capítulo introductorio no cuenta con evaluación.');
                    } else {
                      setIsEvaluacionOpen(true);
                    }
                  }}
                  className="w-full bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Iniciar evaluación
                </button>

                <button 
                  onClick={() => {
                    if (capituloActualIndex + 1 < capitulos.length && !capitulos[capituloActualIndex + 1].bloqueado) {
                      setCapituloActualIndex(capituloActualIndex + 1);
                    } else {
                      toast.error('Completa y aprueba la evaluación para desbloquear el siguiente video.');
                    }
                  }}
                  className="w-full bg-[#2a3033] hover:bg-[#343c40] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Siguiente video
                </button>

                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progreso</span>
                    <span>
                      {Math.round((capitulos.filter(c => c.completado).length / capitulos.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#2a2f32] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#E96324] h-full transition-all duration-300"
                      style={{ 
                        width: `${(capitulos.filter(c => c.completado).length / capitulos.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>

      </main>
    </div>
  );
}