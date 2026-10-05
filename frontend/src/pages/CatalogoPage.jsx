import React, { useState, useEffect, useMemo } from 'react';
import { FaHeart, FaLocationDot, FaHeartCircleXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function CatalogoPage({ onOpenUbi }) {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Petición al backend al cargar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productos'); // Reemplaza con tu URL
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const categoriasDisponibles = useMemo(() => {
    const todasLasCategorias = productos.flatMap((p) => p.tags || []);
    return [...new Set(todasLasCategorias)];
  }, [productos]);

  // Filtrado combinado: Nombre + Categoría + Orden por Precio
  const productosFiltrados = useMemo(() => {
    let lista = productos.filter((p) => {
      // Coincidencia con la búsqueda por nombre
      const coincideNombre = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Coincidencia con la categoría elegida (si no hay ninguna seleccionada, pasan todos)
      const coincideCategoria = selectedCategory === '' || (p.tags && p.tags.includes(selectedCategory));

      return coincideNombre && coincideCategoria;
    });

    // Ordenamiento por precio
    if (sortPrice === 'asc') {
      lista.sort((a, b) => a.precio - b.precio);
    } else if (sortPrice === 'desc') {
      lista.sort((a, b) => b.precio - a.precio);
    }

    return lista;
  }, [productos, searchTerm, selectedCategory, sortPrice]);

  const handleProductClick = (id) => {
    navigate(`/productos/${id}`);
  };

  if (loading) {
    return (
      <div className="bg-[#2c3335] min-h-screen text-white flex justify-center items-center">
        <p className="text-xl font-medium">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#2c3335] min-h-screen text-white flex justify-center items-center">
        <p className="text-xl text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#2c3335] min-h-screen text-white pt-24 font-poppins selection:bg-[#E96324] selection:text-white">
      {/* SECCIÓN DE BÚSQUEDA Y FILTROS */}
      <header className="sticky top-22 z-50 w-full bg-[#2c3335] border-b border-[#5f5e5e] px-11 py-6 flex max-lg:flex-col justify-center items-center gap-6 transition-all duration-300">
        <a href="/favoritos" className="no-underline text-[#757a73] max-lg:w-full max-lg:max-w-75">
          <div className="flex items-center justify-center gap-2 bg-[#1e2122] px-5 py-2.5 rounded-full hover:bg-[#E96324] hover:text-white hover:-translate-y-1 transition-all duration-200 cursor-pointer">
            <FaHeart size={18} />
            <p className="font-medium text-sm">Ver favoritos</p>
          </div>
        </a>

        <div className="w-[60%] max-lg:w-full flex max-lg:flex-col items-center justify-center gap-4 relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[40%] max-lg:w-full p-4 bg-[#1e2122] border border-[#181515] rounded-md text-white outline-none focus:outline-[#E96324] focus:outline-2"
          />

          {/* Filtro por Categorías */}
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="p-4 px-8 bg-[#1e2122] text-white rounded-xl outline-none cursor-pointer max-lg:w-full border border-[#181515]"
          >
            <option value="">Categorías</option>
            {categoriasDisponibles.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSortPrice(e.target.value)}
            value={sortPrice}
            className="p-4 px-8 bg-[#1e2122] text-white rounded-xl outline-none cursor-pointer max-lg:w-full"
          >
            <option value="" hidden>Precio</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>

        <div
          onClick={onOpenUbi}
          className="flex max-lg:hidden items-center gap-2 bg-[#1e2122] px-4 py-2.5 text-[#757a73] rounded-full hover:bg-[#E96324] hover:text-white hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        >
          <p className="text-sm">¿Dónde nos ubicamos?</p>
          <FaLocationDot size={18} />
        </div>
      </header>

      {/* RENDERIZADO DE PRODUCTOS */}
      <main className="w-full min-h-[80vh] bg-[#2c3335] flex justify-center items-center p-8 max-lg:p-4 relative">
        {productosFiltrados.length > 0 ? (
          <div className="w-full max-w-7xl grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                onClick={() => handleProductClick(producto.id)}
                className="w-full max-w-85 h-100 bg-[#1e2122] rounded-2xl p-2.5 shadow-md hover:-translate-y-1 transition-transform duration-200 cursor-pointer flex flex-col"
              >
                <div className="w-full h-[60%] bg-[#e2e2e2] rounded-lg overflow-hidden relative">
                  <div className="absolute top-3.5 left-2.5 px-2.5 py-1 rounded-full text-xs text-white bg-black/90 font-medium">
                    <p>Solo en tienda</p>
                  </div>

                  {producto.oferta && (
                    <div className="absolute top-3.5 right-0 px-3.5 py-1 rounded-l-full bg-[#EAFF59] text-black text-xs font-semibold">
                      <p><span>{producto.txtoferta}</span></p>
                    </div>
                  )}

                  <img
                    src={producto.imagen[0]}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="h-[40%] p-4 flex flex-col justify-between text-[#e2e2e2]">
                  <div>
                    <h3 className="text-xl font-medium text-white">{producto.nombre}</h3>
                    <p className="text-sm line-clamp-2 mt-1">{producto.descripcion}</p>
                  </div>
                  <p className="text-lg font-medium text-black bg-[#E96324] w-fit px-2.5 py-0.5 rounded-full mt-1">
                    C${producto.precio.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[#8c8c8c] py-16 text-center">
            <FaHeartCircleXmark size={96} className="text-[#8d8d8d] mb-4" />
            <h1 className="text-2xl font-bold">No encontramos resultados</h1>
            <p className="mt-2 text-sm">Lo sentimos, lo que estás buscando no está disponible en este momento</p>
          </div>
        )}
      </main>
    </div>
  );
}