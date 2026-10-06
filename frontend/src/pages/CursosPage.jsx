import React, { useState } from 'react';
import { 
  FaMagnifyingGlass, 
  FaClock, 
  FaFilm, 
  FaBell, 
  FaChevronRight, 
  FaHouse 
} from 'react-icons/fa6';

export default function CursosPage() {
  const [busqueda, setBusqueda] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  // Lista simulada de cursos basada en la imagen
  const cursos = [
    {
      id: 1,
      titulo: 'Curso de bisutería artesanal',
      descripcion: 'Aprende sobre las distintas técnicas para la elaboración de bisutería artesanal para crear tus propios ac...',
      duracion: '4 horas',
      lecciones: '8 lecciones',
      imagen: 'https://i.ibb.co/9HQ3MvB6/Portada-curso-Mesa-de-trabajo-1-02.png',
      precio: 'Gratis',
      estado: 'disponible',
    },
    {
      id: 2,
      titulo: 'Curso de pintura',
      descripcion: 'Obtendrás las habilidades y técnicas necesarias para crear tus propias piezas creativas.',
      duracion: '10 horas',
      lecciones: '13 lecciones',
      imagen: 'https://www.nicaraguadisena.com/wp-content/uploads/2021/07/TALLER-DE-PINTURA-4-1080x720.jpg',
      precio: '$11.99',
      estado: 'pago'
    },
    {
      id: 3,
      titulo: 'Decoración de interiores',
      descripcion: 'Aprenderás a emplear distintas decoraciones en tu hogar para crear espacios agradables y hermosos.',
      duracion: '6 horas',
      lecciones: '7 lecciones',
      imagen: null,
      estado: 'proximamente'
    },
    {
      id: 4,
      titulo: 'Curso de fotografía creativa',
      descripcion: 'Descubre el arte de capturar imágenes únicas con tu teléfono o cámara profesional.',
      duracion: '5 horas',
      lecciones: '10 lecciones',
      imagen: null,
      estado: 'proximamente'
    }
  ];

  // Filtrado de cursos por el panel lateral
  const cursosFiltrados = cursos.filter(c => 
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-[#181c1e] min-h-screen text-white pt-24 pb-16 font-poppins selection:bg-[#E96324] selection:text-white">
      <main className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR / PANEL LATERAL */}
        <aside className="w-full md:w-80 bg-[#1e2224] p-6 rounded-2xl h-fit border border-[#2d3336]">
          {/* BUSCADOR */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar cursos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#141718] text-sm text-white pl-10 pr-4 py-3 rounded-full border border-[#2c3235] focus:outline-none focus:border-[#E96324]"
            />
            <FaMagnifyingGlass className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
          </div>

          {/* LISTA DE CURSOS DISPONIBLES */}
          <h3 className="text-sm font-semibold text-gray-200 mb-4">Cursos disponibles</h3>
          <div className="flex flex-col border-t border-[#2c3235]">
            {cursos.map((c) => (
              <button
                key={c.id}
                onClick={() => setCursoSeleccionado(c.id)}
                className={`text-left text-xs sm:text-sm py-3.5 px-2 border-b border-[#2c3235] transition-colors hover:text-[#E96324] ${
                  cursoSeleccionado === c.id ? 'text-[#E96324] font-medium' : 'text-gray-300'
                }`}
              >
                {c.titulo}
              </button>
            ))}
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <section className="flex-1">
          
          {/* BREADCRUMB / MIGAS DE PAN */}
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#1e2224] px-4 py-2.5 rounded-lg w-fit mb-6">
            <FaHouse size={12} />
            <span>/</span>
            <span className="text-gray-200">Cursos</span>
            <span>/</span>
          </div>

          <h1 className="text-3xl font-playfair font-bold text-white mb-8">
            Nuestras ofertas de cursos
          </h1>

          {/* GRID DE CURSOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosFiltrados.map((curso) => (
              <div 
                key={curso.id}
                className="bg-[#1e2224] rounded-2xl overflow-hidden border border-[#2d3336] flex flex-col justify-between p-4 hover:border-gray-600 transition-all"
              >
                <div>
                  {/* ÁREA DE IMAGEN O PROXIMAMENTE */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#272c2f] flex items-center justify-center mb-4">
                    {curso.imagen ? (
                      <>
                        <img 
                          src={curso.imagen} 
                          alt={curso.titulo} 
                          className="w-full h-full object-cover"
                        />
                        {curso.badge && (
                          <span className="absolute top-3 left-3 bg-[#E96324]/90 text-white font-playfair text-xs italic px-3 py-1 rounded-full shadow-md">
                            {curso.badge}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400 font-bold text-lg tracking-wide">
                        Próximamente...
                      </span>
                    )}
                  </div>

                  {/* TÍTULO Y DESCRIPCIÓN */}
                  <h2 className="text-lg font-bold text-white mb-2 leading-tight">
                    {curso.titulo}
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                    {curso.descripcion}
                  </p>
                </div>

                <div>
                  {/* DETALLES DE DURACIÓN Y LECCIONES */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                    <div className="flex items-center gap-1.5">
                      <FaClock size={13} />
                      <span>{curso.duracion}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaFilm size={13} />
                      <span>{curso.lecciones}</span>
                    </div>
                  </div>

                  {/* BOTONES DE ACCIÓN */}
                  <div className="flex items-center gap-2">
                    {curso.estado === 'disponible' && (
                      <>
                        <button className="flex-1 bg-[#E96324] hover:bg-[#c84f1a] text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1 transition-colors">
                          <span>Empezar</span>
                          <FaChevronRight size={10} />
                        </button>
                        <button className="bg-[#2a3033] hover:bg-[#333a3e] text-white p-3 rounded-xl transition-colors">
                          <FaBell size={13} />
                        </button>
                      </>
                    )}

                    {curso.estado === 'pago' && (
                      <>
                        <button className="flex-1 bg-[#E96324] hover:bg-[#c84f1a] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors">
                          Obtener por {curso.precio}
                        </button>
                        <button className="bg-[#2a3033] hover:bg-[#333a3e] text-white p-3 rounded-xl transition-colors">
                          <FaBell size={13} />
                        </button>
                      </>
                    )}

                    {curso.estado === 'proximamente' && (
                      <button className="w-full bg-[#151819] hover:bg-[#202427] text-gray-400 text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-[#292f32]">
                        <FaBell size={12} />
                        <span>Agregar recordatorio</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}