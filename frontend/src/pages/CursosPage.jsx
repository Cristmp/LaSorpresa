import { useEffect, useState } from 'react';
import { 
  FaMagnifyingGlass, 
  FaClock, 
  FaFilm, 
  FaBell, 
  FaChevronRight, 
  FaHouse 
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function CursosPage() {
  const [busqueda, setBusqueda] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const cargarCursos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cursos', {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('No se pudieron cargar los cursos.');
        }

        const cursosDB = await response.json();
        if (!Array.isArray(cursosDB)) {
          throw new Error('La respuesta de cursos no tiene un formato válido.');
        }

        setCursos(cursosDB);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error al cargar los cursos:', error);
          setError('No se pudieron cargar los cursos. Intenta de nuevo más tarde.');
        }
      }
    };

    cargarCursos();
    return () => controller.abort();
  }, []);

  // Filtrado de cursos por el panel lateral
  const cursosFiltrados = cursos.filter(c => 
    c.nombre_curso.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-[#181c1e] min-h-screen mt-12 text-white pt-24 pb-16 font-poppins selection:bg-[#E96324] selection:text-white">
      <main className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR / PANEL LATERAL */}
        <aside className="w-full md:w-80 sticky top-30 bg-[#1e2224] p-6 rounded-2xl h-fit border border-[#2d3336]">
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
                key={c.idCursos}
                onClick={() => setCursoSeleccionado(c.idCursos)}
                className={`text-left text-xs sm:text-sm py-3.5 px-2 border-b border-[#2c3235] transition-colors hover:text-[#E96324] ${
                  cursoSeleccionado === c.idCursos ? 'text-[#E96324] font-medium' : 'text-gray-300'
                }`}
              >
                {c.nombre_curso}
              </button>
            ))}
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <section className="flex-1">

          <h1 className="text-3xl font-playfair font-bold text-white mb-8">
            Nuestras ofertas de cursos
          </h1>

          {/* GRID DE CURSOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {error ? (
              <p className="text-base text-red-400">{error}</p>
            ) : cursosFiltrados.map((curso) => (
              <div 
                key={curso.idCursos}
                className="bg-[#1e2224] rounded-2xl overflow-hidden border border-[#2d3336] flex flex-col justify-between p-4 hover:border-gray-600 transition-all"
              >
                <div>
                  {/* ÁREA DE IMAGEN O PROXIMAMENTE */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#272c2f] flex items-center justify-center mb-4">
                    {curso.portada ? (
                      <>
                        <img 
                          src={curso.portada} 
                          alt={curso.nombre_curso} 
                          className="w-full h-full object-cover"
                        />
                        {curso.badge && (
                          <span className="absolute top-3 left-3 bg-[#E96324]/90 text-white font-playfair text-sm italic px-3 py-1 rounded-full shadow-md">
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
                  <h2 className="text-lg font-bold text-white mb-1 mt-2 leading-tight">
                    {curso.nombre_curso}
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 leading-relaxed">
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
                      <span>{curso.lecciones} lecciones</span>
                    </div>
                  </div>

                  {/* BOTONES DE ACCIÓN */}
                  <div className="flex items-center gap-2">
                    {curso.estado === 'disponible' && (
                      <>
                        <Link to={`/cursos/${curso.idCursos}`} className="flex-1 bg-[#E96324] hover:bg-[#c84f1a] text-white text-sm font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-1 transition-colors">
                          <span>Empezar</span>
                          <FaChevronRight size={10} />
                        </Link>
                        <button className="bg-[#2a3033] hover:bg-[#333a3e] text-white p-3 rounded-xl transition-colors">
                          <FaBell size={18} />
                        </button>
                      </>
                    )}

                    {curso.estado === 'pago' && (
                      <>
                        <button className="flex-1 bg-[#E96324] hover:bg-[#c84f1a] text-white text-sm font-semibold py-3 px-4 rounded-lg transition-colors">
                          Obtener por {Number(curso.precio) === 0 ? 'Gratis' : `$${Number(curso.precio).toFixed(2)}`}
                        </button>
                        <button className="bg-[#2a3033] hover:bg-[#333a3e] text-white p-3 rounded-xl transition-colors">
                          <FaBell size={18} />
                        </button>
                      </>
                    )}

                    {curso.estado === 'proximamente' && (
                      <button className="w-full bg-[#151819] hover:bg-[#202427] text-gray-400 text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-[#292f32]">
                        <FaBell size={18} />
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