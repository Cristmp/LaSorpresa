import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChevronLeft, 
  FaHouse, 
  FaThumbsUp, 
  FaUserGroup, 
  FaFilm, 
  FaClock, 
  FaChartSimple, 
  FaInfinity, 
  FaShareNodes, 
  FaPlay,
} from 'react-icons/fa6';
import { RiMedalLine } from "react-icons/ri";

export default function InfoCursoPage() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('informacion');
  const [reproduciendo, setReproduciendo] = useState(false);

  const cursoInfo = {
    titulo: 'Nuestras ofertas de cursos',
    subtitulo: 'Nuestras ofertas de cursos',
    valoracion: '90% valoración positiva',
    estudiantes: '+70 estudiantes',
    lecciones: '8 lecciones',
    duracion: '4 hrs de curso',
    nivel: 'Principiante',
    acceso: 'Acceso ilimitado',
    instructor: 'Marina Toruño',
    rolInstructor: 'Diseñadora y emprendedora',
    videoUrl: 'https://drive.google.com/file/d/1O0j18t678gmuK2aFpccu5_XPe0-2PpZN/preview',
    poster: 'https://i.ibb.co/9HQ3MvB6/Portada-curso-Mesa-de-trabajo-1-02.png',
    descripcion: `Es este curso aprenderás mediante diferentes módulos, las distintas técnicas de bisuteria para dar paso a tus primeras creaciones dentro del mundo de las artesanias, aprenderás a usar distintas herramientas y materialees para crear piezas únicas`
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cursoInfo.titulo,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="bg-[#181c1e] min-h-screen mt-12 text-white pt-24 pb-16 font-poppins selection:bg-[#E96324] selection:text-white">
      <main className="max-w-7xl mx-auto px-6">
        

        {/* BOTÓN REGRESAR */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border border-[#3a4246] hover:bg-[#22282a] text-gray-200 text-base px-6 py-3 rounded-full mb-6 transition-colors cursor-pointer"
        >
          <FaChevronLeft size={12} />
          <span>Regresar</span>
        </button>

        {/* ENCABEZADO */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-1">
              {cursoInfo.titulo}
            </h1>
            <p className="text-sm text-gray-400">{cursoInfo.subtitulo}</p>
          </div>

          <div className="bg-[#242a2d] p-3 rounded-2xl hidden sm:flex items-center justify-center text-gray-300">
            <RiMedalLine size={34}/>
          </div>
        </div>

        <div className="flex border-b border-[#2d3336] mb-8 overflow-x-auto">
          {[
            { id: 'informacion', label: 'Información' },
            { id: 'contenido', label: 'Contenido' },
            { id: 'proyectos', label: 'Proyectos' },
            { id: 'comunidad', label: 'Comunidad' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={`px-8 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                tabActiva === tab.id
                  ? 'border-[#E96324] text-white bg-[#E96324]/10 rounded-t-lg'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL Y SIDEBAR DERECHO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Ver video introductorio</p>
              
              {/* REPRODUCTOR DE VIDEO */}
              <div className="relative w-full h-80 sm:h-105 bg-[#121516] rounded-2xl overflow-hidden border border-[#2d3336] group">
                {!reproduciendo ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                      src={cursoInfo.poster} 
                      alt="Portada de curso" 
                      className="w-full h-full object-cover brightness-75"
                    />
                    
                    

                    <button 
                      onClick={() => setReproduciendo(true)}
                      className="absolute w-20 h-20 bg-white/20 backdrop-blur-md hover:bg-[#E96324] hover:scale-110 text-white rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl"
                    >
                      <FaPlay size={28} className="ml-1" />
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={cursoInfo.videoUrl} 
                    title="Video introductorio del curso"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* SECCIÓN DESCRIPCIÓN */}
            <div className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl border border-[#2d3336]">
              <h2 className="text-xl font-semibold text-white mb-4">Descripción</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {cursoInfo.descripcion}
              </p>
            </div>
          </div>

          <aside className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl border border-[#2d3336] h-fit flex flex-col sticky top-30 gap-6">
            
            <button className="w-full bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold py-4 px-6 rounded-xl text-base transition-colors shadow-lg cursor-pointer">
              Empezar
            </button>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Valoración del curso</h3>
              
              <ul className="flex flex-col gap-3.5 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <FaThumbsUp className="text-gray-400" size={16} />
                  <span>{cursoInfo.valoracion}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaUserGroup className="text-gray-400" size={16} />
                  <span>{cursoInfo.estudiantes}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaFilm className="text-gray-400" size={16} />
                  <span>{cursoInfo.lecciones}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaClock className="text-gray-400" size={16} />
                  <span>{cursoInfo.duracion}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaChartSimple className="text-gray-400" size={16} />
                  <span>Nivel: <strong className="text-[#a8e02c] font-medium">{cursoInfo.nivel}</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <FaInfinity className="text-gray-400" size={16} />
                  <span>{cursoInfo.acceso}</span>
                </li>
              </ul>
            </div>

            <hr className="border-[#2d3336]" />

            {/* INSTRUCTOR */}
            <div className="text-xs text-gray-400">
              <p>Un curso de <strong className="text-white font-semibold">{cursoInfo.instructor}</strong></p>
              <p>{cursoInfo.rolInstructor}</p>
            </div>

            {/* BOTÓN COMPARTIR */}
            <button 
              onClick={handleShare}
              className="w-full bg-[#272d30] hover:bg-[#31383c] text-gray-200 border border-[#3b4347] py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Compartir</span>
              <FaShareNodes size={14} />
            </button>

          </aside>

        </div>

      </main>
    </div>
  );
}