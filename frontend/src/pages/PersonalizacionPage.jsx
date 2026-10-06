import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const PersonalizacionPage = () => {
  // Estados para almacenar los catálogos traídos del Backend
  const [opciones, setOpciones] = useState({
    productos: [],
    colores: [],
    tallas: [],
    telas: []
  });

  // Estados para almacenar las elecciones del usuario
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [imagenActual, setImagenActual] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const [telaSeleccionada, setTelaSeleccionada] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const calcularTotal = () => {

  const prod = opciones.productos.find((p) => p.id === productoSeleccionado);
  const precioBase = prod ? parseFloat(prod.precio) || 0 : 0;

  const talla = opciones.tallas.find((t) => t.id === tallaSeleccionada);
  const extraTalla = talla ? parseFloat(talla.precio_ad) || 0 : 0;

  const tela = opciones.telas.find((t) => t.id === telaSeleccionada);
  const extraTela = tela ? parseFloat(tela.precio_ad) || 0 : 0;

  
  return (precioBase + extraTalla + extraTela).toFixed(2);
};


  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/personalizacion/opciones');
        const data = await response.json();

        setOpciones(data);

        
        if (data.productos && data.productos.length > 0) {
          setProductoSeleccionado(data.productos[0].id);
          setImagenActual(data.productos[0].img_producto || 'https://i.postimg.cc/Y2JMKSYV/camisa-azul.jpg');
        }
        if (data.colores && data.colores.length > 0) setColorSeleccionado(data.colores[0].id);
        if (data.tallas && data.tallas.length > 0) setTallaSeleccionada(data.tallas[0].id);
        if (data.telas && data.telas.length > 0) setTelaSeleccionada(data.telas[0].id);

      } catch (error) {
        console.error('Error al cargar las opciones:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarOpciones();
  }, []);


  const handleHacerPedido = async (e) => {
    e.preventDefault();

   
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Debes iniciar sesión para hacer un pedido personalizado.');
      return;
    }

    if (!nombreCliente.trim() || !telefonoCliente.trim()) {
      toast.error('Por favor, completa los campos obligatorios: Nombre y Número celular.');
      return;
    }

    if (!colorSeleccionado || !tallaSeleccionada || !telaSeleccionada || !productoSeleccionado) {
      toast.error('Por favor selecciona el producto, color, talla y tela.');
      return;
    }

    const payload = {
      id_producto: productoSeleccionado,
      id_color: colorSeleccionado,
      id_talla: tallaSeleccionada,
      id_tela: telaSeleccionada,
      nota_cliente: `Cliente: ${nombreCliente} | Tel: ${telefonoCliente} | Notas: ${descripcion}`
    };

    try {
      setEnviando(true);

      const res = await fetch('http://localhost:3000/api/pedidos/personalizado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

     
      const data = await res.json();

      if (res.ok) {
        toast.success('Pedido personalizado realizado con éxito.');
        setDescripcion('');
        setNombreCliente('');
        setTelefonoCliente('');
      } else {
    
        const mensajeError = data.mensaje || data.message || 'Error desconocido al procesar el pedido';
        toast.error(`Error (${res.status}): ${mensajeError}`);
      }
    } catch (error) {
      console.error('Error al enviar la petición:', error);
      toast.error('Ocurrió un error al conectar con el servidor.');
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#22282A] flex items-center justify-center text-white font-sans">
        Cargando opciones de personalización...
      </div>
    );
  }

  return (
    <div className="bg-[#22282A] min-h-screen py-10 font-poppins">
      <main className="w-[90%] max-w-312.5 mx-auto">
        
        {/* Banner */}
        <section className="w-full h-50 rounded-2xl overflow-hidden mb-8 relative mt-20">
          <img 
            src="https://i.postimg.cc/XJ7bVGvn/Captura-de-pantalla-2026-05-31-105153.jpg" 
            alt="banner" 
            className="w-full h-full object-cover"
          />
        </section>

        {/* Sección Principal */}
        <section className="w-full bg-[#111416] rounded-3xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1fr] gap-8 lg:gap-10 items-start">
          
          {/* imágenes */}
          <div className="w-full">
            <div className="w-full h-96 bg-white rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src={imagenActual} 
                alt="Producto Personalizable" 
                className="w-[95%] h-[95%] object-contain"
              />
            </div>

            {/* fotos */}
            <div className="mt-4 flex gap-3">
              {opciones.productos.map((prod) => {
                const isActive = productoSeleccionado === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setProductoSeleccionado(prod.id);
                      if (prod.img_producto) setImagenActual(prod.img_producto);
                    }}
                    className={`flex-1 aspect-square rounded-xl overflow-hidden bg-white cursor-pointer p-1 border-2 transition-all ${
                      isActive 
                        ? 'border-[#E96324] shadow-[0_0_8px_rgba(255,255,255,0.2)]' 
                        : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={prod.img_producto || 'https://i.postimg.cc/Y2JMKSYV/camisa-azul.jpg'} 
                      alt={prod.nombre} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Linea */}
          <div className="hidden lg:block w-px bg-white/15 min-h-137.5 h-full"></div>

          {/* Formulario */}
          <div className="flex flex-col gap-4">
            
            {/* Color */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Color</label>
              <div className="flex gap-3">
                {opciones.colores.map((color) => {
                  const isActive = colorSeleccionado === color.id;
                  return (
                    <span
                      key={color.id}
                      onClick={() => setColorSeleccionado(color.id)}
                      title={color.nombre}
                      style={{ backgroundColor: color.hex }}
                      className={`w-11 h-11 rounded-full border-2 cursor-pointer transition-all ${
                        isActive 
                          ? 'border-white outline-2 outline-[#E96324]' 
                          : 'border-white/20'
                      }`}
                    ></span>
                  );
                })}
              </div>
            </div>

            {/* Talla */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-gray-400">Talla</label>
              <div className="flex gap-2 flex-wrap">
                {opciones.tallas.map((talla) => {
                  const isActive = tallaSeleccionada === talla.id;
                  return (
                    <button
                      key={talla.id}
                      type="button"
                      onClick={() => setTallaSeleccionada(talla.id)}
                      className={`px-6 py-2.5 border rounded text-xs cursor-pointer transition-colors ${
                        isActive 
                          ? 'bg-[#333] text-white border-[#333]' 
                          : 'bg-transparent text-gray-300 border-white/20 hover:bg-white hover:text-black'
                      }`}
                    >
                      {talla.nombre}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tipo de Tela */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Tipo de tela</label>
              <select
                value={telaSeleccionada || ''}
                onChange={(e) => setTelaSeleccionada(Number(e.target.value))}
                className="w-full bg-[#1f2429] border-none rounded-lg px-4 py-3 text-white outline-none text-sm cursor-pointer"
              >
                {opciones.telas.map((tela) => (
                  <option key={tela.id} value={tela.id}>
                    {tela.nombre} {tela.precio_ad > 0 ? `(+ C$ ${tela.precio_ad})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* mostrar Total */}
            <div className="w-full border-t border-white/15 my-4 pt-3 flex items-center justify-between">
            <span className="text-gray-400 text-base font-medium">Total estimado:</span>
            <span className="text-[#ccdf25] text-xl font-bold">
                C$ {calcularTotal()}
            </span>
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Descripción</label>
              <textarea
                rows="4"
                placeholder="Describe las características que quieres que tenga la prenda"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full bg-[#1f2429] border-none rounded-lg p-3 text-white outline-none text-sm resize-none placeholder:text-gray-500"
              ></textarea>
            </div>

            {/* telefono y nombre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Número celular *</label>
                <input
                  type="text"
                  placeholder="Ej: 5722 90##"
                  value={telefonoCliente}
                  onChange={(e) => setTelefonoCliente(e.target.value)}
                  className="w-full bg-[#1f2429] border-none rounded-lg px-4 py-3 text-white outline-none text-sm placeholder:text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Nombre *</label>
                <input
                  type="text"
                  placeholder="Tu nombre completo aquí"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="w-full bg-[#1f2429] border-none rounded-lg px-4 py-3 text-white outline-none text-sm placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Botón de enviar */}
            <button
              onClick={handleHacerPedido}
              disabled={enviando}
              className="mt-2 w-full py-3.5 rounded-lg bg-[#ccdf25] hover:bg-[#bccc1f] text-black text-sm font-bold cursor-pointer transition-colors disabled:opacity-50"
            >
              {enviando ? 'Procesando pedido...' : 'Hacer pedido'}
            </button>

          </div>

        </section>
      </main>
    </div>
  );
};

export default PersonalizacionPage;