import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaHeart, 
  FaRegHeart, 
  FaShareNodes, 
  FaStore, 
  FaTrashCan 
} from 'react-icons/fa6';

export default function InfoProductPage() {
  const { id: idSeleccionado } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [recomendados, setRecomendados] = useState([]);
  const [imagenActiva, setImagenActiva] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  // Estados de Reseñas
  const [reseñas, setReseñas] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  useEffect(() => {
    if (!idSeleccionado) {
      setError('No se ha seleccionado ningún producto.');
      setLoading(false);
      return;
    }

    const fetchDatos = async () => {
      try {
        setLoading(true);
        // 1. Obtener producto individual
        const resProd = await fetch(`http://localhost:3000/api/productos/${idSeleccionado}`);
        if (!resProd.ok) throw new Error('Error al cargar el producto');
        const dataProd = await resProd.json();

        setProducto(dataProd);
        setImagenActiva(dataProd.imagen?.[0] || '');

        // Check de favoritos
        const favs = JSON.parse(localStorage.getItem('misFavoritos')) || [];
        setEsFavorito(favs.includes(dataProd.id));

        // 2. Obtener lista para productos recomendados
        const resTodos = await fetch('http://localhost:3000/api/productos');
        if (resTodos.ok) {
          const todos = await resTodos.json();
          const filtrados = todos
            .filter((p) => p.id !== dataProd.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
          setRecomendados(filtrados);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();

    // Cargar Reseñas locales
    const STORAGE_KEY = `product_reviews_${idSeleccionado}`;
    const reviewsGuardadas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setReseñas(reviewsGuardadas);
  }, [idSeleccionado]);

  // Manejador de favoritos
  const toggleFavorito = () => {
    let listaFavs = JSON.parse(localStorage.getItem('misFavoritos')) || [];
    const idNum = parseInt(idSeleccionado);

    if (esFavorito) {
      listaFavs = listaFavs.filter((id) => id !== idNum);
      setEsFavorito(false);
    } else {
      listaFavs.push(idNum);
      setEsFavorito(true);
    }
    localStorage.setItem('misFavoritos', JSON.stringify(listaFavs));
  };

  // Manejadores de Reseñas
  const handleAgregarReseña = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const nuevaReseña = {
      id: Date.now(),
      username: 'Invitado',
      pfp: 'https://via.placeholder.com/150',
      content: nuevoComentario,
      date: 'publicado ahora mismo'
    };

    const actualizadas = [nuevaReseña, ...reseñas];
    setReseñas(actualizadas);
    localStorage.setItem(`product_reviews_${idSeleccionado}`, JSON.stringify(actualizadas));
    setNuevoComentario('');
  };

  const handleEliminarReseña = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      const actualizadas = reseñas.filter((r) => r.id !== id);
      setReseñas(actualizadas);
      localStorage.setItem(`product_reviews_${idSeleccionado}`, JSON.stringify(actualizadas));
    }
  };

  const handleRecomendadoClick = (id) => {
    navigate(`/productos/${id}`);
  };

  if (loading) {
    return (
      <div className="bg-[#2c3335] min-h-screen text-white flex justify-center items-center">
        <p className="text-xl font-medium">Cargando detalles...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="bg-[#2c3335] min-h-screen text-white flex justify-center items-center">
        <p className="text-xl text-red-400">Error: {error || 'Producto no encontrado'}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#2c3335] min-h-screen text-white pt-28 font-poppins selection:bg-[#E96324] selection:text-white">
      <main className="max-w-7xl mx-auto px-6">
        
        {/* BOTÓN SUPERIOR DE FAVORITOS */}
        <div className="flex justify-start mb-8">
          <a
            href="/favoritos"
            className="flex items-center gap-2 bg-[#1e2122] px-5 py-2.5 rounded-full text-[#7b7b7b] hover:bg-[#E96324] hover:text-white hover:-translate-y-1 transition-all duration-200"
          >
            <FaHeart size={18} />
            <span className="text-sm font-medium">Ver favoritos</span>
          </a>
        </div>

        {/* DETALLE DEL PRODUCTO */}
        <section className="flex flex-col lg:flex-row gap-12 mb-16">
          
          {/* GALERÍA DE IMÁGENES */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-87.5 sm:h-130 rounded-2xl overflow-hidden bg-[#182024]">
              <img
                src={imagenActiva || 'https://via.placeholder.com/500'}
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            </div>

            {/* MINIATURAS */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {producto.imagen?.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Vista ${index + 1}`}
                  onClick={() => setImagenActiva(imgUrl)}
                  className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                    imagenActiva === imgUrl ? 'border-[#E96324]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* INFORMACIÓN DEL PRODUCTO */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            <h1 className="text-3xl sm:text-4xl font-bold font-playfair mb-3">{producto.nombre}</h1>
            <h2 className="text-2xl font-semibold mb-6">C$ {producto.precio.toFixed(2)}</h2>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-6">
              {producto.tags?.map((tag, i) => (
                <span key={i} className="bg-[#E96324] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[#b3b3b3] text-base leading-relaxed mb-8 max-w-lg">
              {producto.descripcion}
            </p>

            <div className="flex items-center gap-3 text-[#b3b3b3] mb-8">
              <FaStore size={20} />
              <span>Disponible solo en tienda!</span>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex gap-4 items-center">
              <button
                onClick={toggleFavorito}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-3 bg-[#182024] hover:bg-[#1f2b30] px-8 py-4 rounded-xl font-semibold transition-transform hover:-translate-y-0.5"
              >
                {esFavorito ? <FaHeart className="text-[#E96324]" size={18} /> : <FaRegHeart size={18} />}
                {esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </button>

              <button className="w-14 h-14 bg-[#d7d7d7] text-black rounded-xl flex items-center justify-center hover:bg-white transition-colors">
                <FaShareNodes size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN RECOMENDADOS */}
        {recomendados.length > 0 && (
          <section className="border-t border-[#646D61] pt-10 mb-16">
            <h3 className="text-xl font-bold mb-6">Productos recomendados</h3>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {recomendados.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleRecomendadoClick(rec.id)}
                  className="min-w-55 max-w-55 bg-[#1e2122] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform"
                >
                  <img src={rec.imagen?.[0]} alt={rec.nombre} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold text-white truncate">{rec.nombre}</h4>
                    <span className="text-[#8b8b8b] text-sm">C$ {rec.precio.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN RESEÑAS */}
        <section className="border-t border-[#646D61] pt-10 pb-20">
          <h2 className="text-2xl font-bold mb-6">Reseñas de clientes</h2>

          <div className="bg-[#1e2122] rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* LISTA DE RESEÑAS */}
            <div className="space-y-6 mb-8">
              {reseñas.length > 0 ? (
                reseñas.map((rev) => (
                  <div key={rev.id} className="flex justify-between items-start border-b border-[#333333] pb-6">
                    <div className="flex gap-4">
                      <img src={rev.pfp} alt="Avatar" className="w-14 h-14 rounded-full object-cover" />
                      <div>
                        <h3 className="font-bold text-white text-base">{rev.username}</h3>
                        <p className="text-[#cfcfcf] my-1 text-sm">{rev.content}</p>
                        <span className="text-xs text-[#7e7e7e]">{rev.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEliminarReseña(rev.id)}
                      className="text-[#7e7e7e] hover:text-red-400 p-2 transition-colors"
                      title="Eliminar reseña"
                    >
                      <FaTrashCan size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[#8c8c8c] italic text-sm">Aún no hay reseñas para este producto. ¡Sé el primero en comentar!</p>
              )}
            </div>

            {/* FORMULARIO DE COMENTARIO */}
            <form onSubmit={handleAgregarReseña} className="flex flex-col gap-4">
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu reseña aquí..."
                rows={3}
                required
                className="w-full p-4 bg-[#101316] text-white rounded-xl border border-[#333333] outline-none focus:border-[#E96324] resize-none"
              />
              <button
                type="submit"
                className="self-end bg-[#E96324] hover:bg-[#c84f1a] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Publicar reseña
              </button>
            </form>
          </div>
        </section>

      </main>
    </div>
  );
}