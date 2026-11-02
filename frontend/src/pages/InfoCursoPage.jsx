import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  FaChevronLeft, 
  FaThumbsUp, 
  FaUserGroup, 
  FaFilm, 
  FaClock, 
  FaChartSimple, 
  FaInfinity, 
  FaShareNodes, 
  FaPlay,
  FaCircleCheck,
  FaFilePdf,
  FaTrashCan,
  FaPaperPlane
} from 'react-icons/fa6';
import { RiMedalLine } from "react-icons/ri";

export default function InfoCursoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tabActiva, setTabActiva] = useState('informacion');
  const [reproduciendo, setReproduciendo] = useState(false);
  const [cursoInfo, setCursoInfo] = useState(null);
  const [error, setError] = useState('');

  {/*Medallas*/}
  const [medallas, setMedallas] = useState([]);
  const [medallasCargando, setMedallasCargando] = useState(true);
  const [medallasError, setMedallasError] = useState('');

  {/*Capitulos*/}
  const [capitulosDB, setCapitulosDB] = useState([]);
  const [capitulosCompletados, setCapitulosCompletados] = useState([]);
  const [progresoError, setProgresoError] = useState('');

  useEffect(() => {
    if (!id) return undefined;

    const controller = new AbortController();
    const cargarCapitulosYProgreso = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cursos/${id}/capitulos`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('No se pudieron cargar los capítulos del curso.');
        }

        const capitulos = await response.json();
        if (!Array.isArray(capitulos)) {
          throw new Error('La respuesta de capítulos no tiene un formato válido.');
        }
        setCapitulosDB(capitulos);

        const token = localStorage.getItem('token');
        if (!token) {
          setCapitulosCompletados([]);
          setProgresoError('');
          return;
        }

        const progresoResponse = await fetch(`http://localhost:3000/api/cursos/${id}/progreso`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!progresoResponse.ok) {
          throw new Error('No se pudo cargar el progreso del curso.');
        }

        const progreso = await progresoResponse.json();
        if (!Array.isArray(progreso)) {
          throw new Error('La respuesta de progreso no tiene un formato válido.');
        }

        setCapitulosCompletados(
          progreso
            .filter((registro) => Number(registro.completado) === 1)
            .map((registro) => String(registro.capitulo_id))
        );
        setProgresoError('');
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error al cargar capítulos o progreso:', error);
          setProgresoError('No se pudo cargar el progreso guardado.');
        }
      }
    };

    cargarCapitulosYProgreso();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return undefined;
    }

    const controller = new AbortController();
    const cargarCurso = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cursos/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del curso.');
        }

        const cursoDB = await response.json();
        if (!cursoDB || typeof cursoDB !== 'object' || !cursoDB.idCursos) {
          throw new Error('La respuesta del curso no tiene un formato válido.');
        }

        setCursoInfo(cursoDB);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error al cargar la información del curso:', error);
          setError('No se pudo cargar la información del curso. Intenta de nuevo más tarde.');
        }
      }
    };

    cargarCurso();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return undefined;
    }

    const controller = new AbortController();
    const cargarMedallas = async () => {
      setMedallas([]);
      setMedallasError('');
      setMedallasCargando(true);

      try {
        // Recuperar el token del usuario si inició sesión
        const token = localStorage.getItem('token'); 

        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`http://localhost:3000/api/cursos/${id}/medallas`, {
          signal: controller.signal,
          headers: headers
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar las medallas del curso.');
        }

        const medallasDB = await response.json();
        if (!Array.isArray(medallasDB)) {
          throw new Error('La respuesta de medallas no tiene un formato válido.');
        }

        setMedallas(medallasDB);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error al cargar las medallas del curso:', error);
          setMedallasError('No se pudieron cargar las medallas del curso. Intenta de nuevo más tarde.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setMedallasCargando(false);
        }
      }
    };

    cargarMedallas();
    return () => controller.abort();
  }, [id]);

  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      usuario: 'Belén_05',
      pfp: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      comentario: 'Muy buen curso, muy bonito aprendí muchas cosas.',
      fecha: 'publicado hace 1d'
    },
    {
      id: 2,
      usuario: 'MarioK',
      pfp: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      comentario: 'Muy recomendado, ahora ya puedo hacer mis propios brazaletes :)',
      fecha: 'publicado hace 2d'
    }
  ]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  // Proyectos / Retos para la comunidad
  const proyectosRetos = [
    {
      id: 101,
      titulo: 'Brazalete rojo',
      descripcion: 'Brazalete de hilo rojo ajustables con puntos. Lorem ipsum dolor sit amet consectetur adipiscing elit, metus a inceptos curae torquent orci lacus, varius eget odio sociis dictum sapien. Accumsan dictumst integer suscipit in ultricies massa potenti venenatis per tincidunt habitasse, nullam lacus platea.',
      dificultad: 'Fácil',
      imagen: 'https://m.media-amazon.com/images/I/51xMQ0NY69L._AC_UY1000_.jpg'
    },
    {
      id: 102,
      titulo: 'Collar de alambre',
      descripcion: 'Collar de alambre con puntos de colores. Lorem ipsum dolor sit amet consectetur adipiscing elit, metus a inceptos curae torquent orci lacus, varius eget odio sociis dictum sapien. Accumsan dictumst integer suscipit in ultricies massa potenti venenatis per tincidunt habitasse, nullam lacus platea.',
      dificultad: 'Intermedio',
      imagen: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const handlePublicarComentario = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const storedUser = localStorage.getItem('user');
    const userObj = storedUser ? JSON.parse(storedUser) : null;

    const comentarioNuevo = {
      id: Date.now(),
      usuario: userObj?.nombre || 'Nombre de usuario',
      pfp: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      comentario: nuevoComentario,
      fecha: 'publicado hace un momento'
    };

    setComentarios([comentarioNuevo, ...comentarios]);
    setNuevoComentario('');
  };

  const handleEliminarComentario = (id) => {
    if (window.confirm('¿Deseas eliminar este comentario?')) {
      setComentarios(comentarios.filter(c => c.id !== id));
    }
  };

  // Temario de Módulos y Unidades (Índice)
  const temario = [
    { 
      id: 'm1', 
      tipo: 'modulo', 
      codigo: 'M1', 
      titulo: 'Pulseras',
    },
    { 
      id: 'm2', 
      tipo: 'modulo', 
      codigo: 'M2', 
      titulo: 'Collares',
      unidades: [
        { id: 'u6', codigo: 'U1', titulo: 'Introducción a las herramientas' },
        { id: 'u7', codigo: 'U2', titulo: 'Diseño de collares cortos' }
      ]
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cursoInfo.nombre_curso,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  const capitulosCompletadosCount = capitulosDB.filter(
    (cap, index) => index === 0 || capitulosCompletados.includes(String(cap.id))
  ).length;
  const progresoPorcentaje = capitulosDB.length
    ? Math.round((capitulosCompletadosCount / capitulosDB.length) * 100)
    : 0;

  const mensajeError = error || (!id ? 'No se especificó el curso que quieres consultar.' : '');
  if (mensajeError || !cursoInfo) {
    return (
      <main className="bg-[#181c1e] min-h-screen mt-12 text-white pt-24 pb-16 font-poppins">
        <p className="max-w-7xl mx-auto px-6 text-sm text-red-400">
          {mensajeError || 'Cargando información del curso...'}
        </p>
      </main>
    );
  }

  return (
    <div className="bg-[#181c1e] min-h-screen mt-12 text-white pt-24 pb-16 font-poppins selection:bg-[#E96324] selection:text-white">
      <main className="max-w-7xl mx-auto px-6">
        
        {/* BOTÓN REGRESAR */}
        <button 
          onClick={() => navigate(`/cursos`)}
          className="flex items-center gap-2 border border-[#3a4246] hover:bg-[#22282a] text-gray-200 text-base px-6 py-3 rounded-full mb-6 transition-colors cursor-pointer"
        >
          <FaChevronLeft size={12} />
          <span>Regresar</span>
        </button>

        {/* ENCABEZADO */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-1">
              {cursoInfo.nombre_curso}
            </h1>
            <p className="text-sm text-gray-400">Curso de bisutería artesanal</p>
          </div>

          <div className="bg-[#242a2d] p-3 rounded-2xl hidden sm:flex items-center justify-center text-gray-300">
            <RiMedalLine size={34}/>
          </div>
        </div>

        {/* NAVEGACIÓN PESTAÑAS (TABS) */}
        <div className="flex border-b border-[#2d3336] mb-8 overflow-x-auto">
          {[
            { id: 'informacion', label: 'Información' },
            { id: 'contenido', label: 'Contenido' },
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

        {/* SECCION 1 */}
        {tabActiva === 'informacion' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-3">Ver video introductorio</p>
                <div className="relative w-full h-80 sm:h-105 bg-[#121516] rounded-2xl overflow-hidden border border-[#2d3336] group">
                  {!reproduciendo ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={cursoInfo.portada} 
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
                    <video
                      src="/videos/video%20introductorio.mov"
                      title="Video introductorio del curso"
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl border border-[#2d3336]">
                <h2 className="text-xl font-semibold text-white mb-4">Descripción</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {cursoInfo.descripcion}
                </p>
              </div>
            </div>

            {/* SIDEBAR DERECHO DE INFORMACIÓN */}
            <aside className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl border border-[#2d3336] h-fit flex flex-col sticky top-30 gap-6">
              <Link to={`/cursos/${id}/contenido`} 
              className="w-full justify-center flex bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold py-4 px-6 rounded-xl text-base transition-colors shadow-lg cursor-pointer"
              >
              Empezar
              </Link>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Valoración del curso</h3>
                <ul className="flex flex-col gap-3.5 text-sm text-gray-300">
                  <li className="flex items-center gap-3"><FaThumbsUp className="text-gray-400" size={16} /><span>80% de valoración positiva</span></li>
                  <li className="flex items-center gap-3"><FaUserGroup className="text-gray-400" size={16} /><span>+70 estudiantes</span></li>
                  <li className="flex items-center gap-3"><FaFilm className="text-gray-400" size={16} /><span>{cursoInfo.lecciones} lecciones</span></li>
                  <li className="flex items-center gap-3"><FaClock className="text-gray-400" size={16} /><span>{cursoInfo.duracion}</span></li>
                  <li className="flex items-center gap-3"><FaChartSimple className="text-gray-400" size={16} /><span>Nivel: <strong className="text-[#a8e02c] font-medium">{cursoInfo.dificultad}</strong></span></li>
                  <li className="flex items-center gap-3"><FaInfinity className="text-gray-400" size={16} /><span>Acceso ilimitado</span></li>
                </ul>
              </div>

              <hr className="border-[#2d3336]" />
              <div className="text-sm text-gray-400">
              <p>Un curso de <strong className="text-white font-semibold">Marina Toruño</strong></p>
              <p>Diseñadora gráfica</p>
               </div>

              <button 
                onClick={handleShare}
                className="w-full bg-[#272d30] hover:bg-[#31383c] text-gray-200 border border-[#3b4347] py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Compartir</span>
                <FaShareNodes size={14} />
              </button>
            </aside>
          </div>
        )}

        {/* SECCION 2*/}
        {tabActiva === 'contenido' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-3">Ver video introductorio</p>
                  {/* VIDEO */}
                <div className="relative w-full h-80 sm:h-105 bg-[#121516] rounded-2xl overflow-hidden border border-[#2d3336] group">
                  {!reproduciendo ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={cursoInfo.portada} 
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
                    <video
                      src="/videos/video%20introductorio.mov"
                      title="Video introductorio del curso"
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
              </div>

              {/* MEDALLAS */}
              <div className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl border border-[#2d3336]">
                <h2 className="text-2xl font-poppins font-bold text-white border-[#2d3336] mb-4 border-b pb-4">Medallas</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center relative z-10">
                  {medallasError ? (
                    <p className="col-span-full text-sm text-red-400" role="alert">{medallasError}</p>
                  ) : medallasCargando ? (
                    <p className="col-span-full text-sm text-gray-400">Cargando medallas...</p>
                  ) : medallas.length === 0 ? (
                    <p className="col-span-full text-sm text-gray-400">Este curso aún no tiene medallas.</p>
                  ) : (
                    <>
                      <hr className="border-[#414649] border-2 top-12 hidden sm:block left-10 absolute w-[80%] border-dashed -z-10"/>
                      {medallas.map((medalla) => (
                        <div key={medalla.id} className="flex flex-col items-center gap-3">
                          <div
                            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center hover:scale-110 justify-center border-2 z-10 transition-all p-3 ${
                              medalla.desbloqueada
                                ? 'bg-white border-[#E96324] shadow-[0_0_15px_rgba(233,99,36,0.3)]'
                                : 'bg-[#2a2f32] border-gray-600 grayscale'
                            }`}
                          >
                            <img
                              src={medalla.url_img}
                              alt={medalla.nombre}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className={`text-sm font-medium ${medalla.desbloqueada ? 'text-white' : 'text-gray-500'}`}>
                            {medalla.nombre}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* DERECHA: ÍNDICE DE MÓDULOS + CARD RECURSO PDF */}
            <aside className="flex flex-col gap-6">
              
              {/* ÍNDICE DE MÓDULOS */}
              <div className="bg-[#1e2224] sticky top-30 p-6 rounded-2xl border border-[#2d3336] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 pb-4 border-b border-[#2a2f32]">Índice de módulos</h3>
                  
                  <div className="flex flex-col gap-2 max-h-80 overflow-y-auto no-scrollbar pr-1">
                    {progresoError && (
                      <p className="text-xs text-red-400" role="alert">{progresoError}</p>
                    )}
                    {temario.map((item) => {
                      
                      return (
                        <div key={item.id} className="flex flex-col gap-1 mt-2">
                          {/* Encabezado del Módulo */}
                          <div className="flex items-center gap-3 bg-[#151819] p-3.5 rounded-lg border-l-4 border-[#E96324]">
                            <span className="w-8 h-8 rounded-full bg-[#E96324] text-white text-sm font-bold flex items-center justify-center">
                              {item.codigo}
                            </span>
                            <span className="font-bold text-base text-white">{item.titulo}</span>
                          </div>

                          {/* UNIDADES*/}
                          <div className="flex flex-col gap-1 pl-4">
                            {item.id === 'm1'
                              ? capitulosDB.map((cap, index) => (
                                <div key={cap.id} className="flex items-center gap-3 py-2 text-sm text-gray-300 border-b border-[#2a2f32]">
                                  {index === 0 || capitulosCompletados.includes(String(cap.id)) ? (
                                    <FaCircleCheck className="text-[#a8e02c] shrink-0" size={32} />
                                  ) : (
                                    <span className="w-8 h-8 rounded-full bg-[#2a2f32] text-gray-300 text-sm flex items-center justify-center">
                                      {index + 1}
                                    </span>
                                  )}
                                  <span>{cap.titulo}</span>
                                </div>
                              ))
                              : item.unidades?.map((unidad) => (
                                <div key={unidad.id} className="flex items-center gap-3 py-2 text-sm text-gray-300 border-b border-[#2a2f32]">
                                  <span className="w-8 h-8 rounded-full bg-[#2a2f32] text-gray-300 text-sm flex items-center justify-center">
                                    {unidad.codigo}
                                  </span>
                                  <span>{unidad.titulo}</span>
                                </div>
                              ))}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

                
                <div className="mt-6 pt-4 border-t border-[#2d3336]">
                  <div className="text-xs text-gray-400 mb-2">
                    <p className="text-white font-medium">Curso de Marina Toruño</p>
                    <p className="text-[11px] text-gray-400">Diseñadora gráfica</p>
                  </div>

                    {/*BOTON CONTINUAR */}
                  <Link to={`/cursos/${id}/contenido`} 
                  className="w-full flex justify-center my-4 bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors mb-3 cursor-pointer">
                    Continuar
                  </Link>

                  <div>
                    {/*BARRA DE PROGRESO */}
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progreso</span>
                      <span>{progresoPorcentaje}%</span>
                    </div>
                    <div className="w-full bg-[#2a2f32] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#E96324] h-full transition-all duration-300"
                        style={{ width: `${progresoPorcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

              </div>

            </aside>

          </div>
        )}

        {/* SECCION 3*/}
        {tabActiva === 'comunidad' && (
          <div className="flex flex-col gap-12">
            
            {/* CONTENEDOR DE PROYECOTOS */}
            <section className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl border border-[#2d3336]">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Proyectos</h2>

              <div className="flex flex-col gap-6">
                {proyectosRetos.map((reto) => (
                  <div 
                    key={reto.id}
                    onClick={() => navigate(`/RetoInfo`)}
                    className="bg-[#151819] hover:bg-[#1a1e20] p-4 sm:p-5 rounded-2xl border border-[#2c3235] flex flex-col sm:flex-row gap-6 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <div className="w-full sm:w-64 h-40 rounded-xl overflow-hidden shrink-0">
                      <img src={reto.imagen} alt={reto.titulo} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{reto.titulo}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{reto.descripcion}</p>
                      </div>

                      <div className="mt-4 flex justify-end items-center">
                        <span className="text-xs text-gray-300 font-medium">
                          Dificultad: <strong className="text-[#a8e02c] font-semibold">{reto.dificultad}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* COMENTARIOS SIN HABILITAR*/}
            <section className="bg-[#1e2224] p-6 sm:p-8 rounded-2xl border border-[#2d3336]">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Comentarios</h2>

              <div className="flex flex-col gap-4 mb-8">
                {comentarios.map((c) => (
                  <div key={c.id} className="bg-[#151819] p-5 rounded-xl border border-[#2a2f32] flex justify-between items-start gap-4">
                    <div className="flex gap-4 items-start">
                      <img src={c.pfp} alt={c.usuario} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-sm text-white">{c.usuario}</h4>
                        <p className="text-gray-300 text-sm my-1">{c.comentario}</p>
                        <span className="text-xs text-gray-500">{c.fecha}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleEliminarComentario(c.id)}
                      className="text-gray-500 hover:text-red-400 p-2 transition-colors cursor-pointer"
                      title="Eliminar comentario"
                    >
                      <FaTrashCan size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handlePublicarComentario} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Escribe tu opinión aquí..."
                  className="flex-1 bg-[#151819] text-white border border-[#2c3235] px-5 py-4 rounded-xl text-sm outline-none focus:border-[#E96324]"
                />
                <button
                  type="submit"
                  className="bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Comentar</span>
                  <FaPaperPlane size={14} />
                </button>
              </form>
            </section>

          </div>
        )}

      </main>
    </div>
  );
}