import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { retos } from '../data/retos.js';

export default function RetoInfoPage() {
  const { id = '101' } = useParams();
  const navigate = useNavigate();
  const proyecto = retos.find((reto) => String(reto.id) === id);

  if (!proyecto) {
    return (
      <main className="bg-[#181c1e] min-h-screen text-white pt-30 pb-16 font-poppins">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-300 mb-4">No se encontró el reto solicitado.</p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-[#3a4246] hover:bg-[#22282a] text-gray-200 text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            <FaChevronLeft size={12} />
            <span>Regresar</span>
          </button>
        </div>
      </main>
    );
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(proyecto.linkPadlet)}`;

  return (
    <div className="bg-[#181c1e] min-h-screen text-white pt-30 pb-16 font-poppins selection:bg-[#E96324] selection:text-white">
      <main className="max-w-7xl mx-auto px-6">

        {/* BOTÓN REGRESAR */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border border-[#3a4246] hover:bg-[#22282a] text-gray-200 text-sm px-6 py-2.5 rounded-full mb-8 transition-colors cursor-pointer"
        >
          <FaChevronLeft size={12} />
          <span>Regresar</span>
        </button>

        {/* TÍTULO PRINCIPAL */}
        <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-8">
          {proyecto.titulo}
        </h1>

        {/* SECCIÓN SUPERIOR: IMAGEN Y TARJETA DE MATERIALES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* IMAGEN DEL PROYECTO (Ocupa 2 columnas) */}
          <div className="lg:col-span-2 w-full h-80 sm:h-110 bg-[#121516] rounded-2xl overflow-hidden border border-[#2d3336]">
            <img 
              src={proyecto.imagen} 
              alt={proyecto.titulo} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* TARJETA DE MATERIALES */}
          <aside className="bg-[#131618] p-6 sm:p-8 rounded-2xl border border-[#262d31] flex flex-col justify-start h-fit">
            <h3 className="text-xl font-bold font-playfair text-white mb-6">Materiales</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              {proyecto.materiales.map((material, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#E96324] font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{material}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* SECCIÓN DE INSTRUCCIONES Y CÓDIGO QR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-playfair font-bold text-white mb-4">Instrucciones</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {proyecto.instrucciones}
            </p>
          </div>

          <div className="flex justify-start lg:justify-end">
            <div className="bg-white p-3 rounded-2xl shadow-xl w-44 h-44 flex items-center justify-center border border-gray-700">
              <img
                src={qrUrl}
                alt="Código QR para padlet"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN DE PADLET Y MARGARITA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-2">Publica tus resultados en:</h3>
            <div
              className="padlet-embed w-full overflow-hidden rounded-xl border border-white/10 bg-[#F4F4F4]"
              style={{ minHeight: 608 }}
            >
              <iframe
                src={proyecto.embedPadlet}
                title={`Padlet para compartir resultados: ${proyecto.titulo}`}
                allow="camera;microphone;geolocation;display-capture;clipboard-write"
                loading="lazy"
                className="block w-full border-0"
                style={{ height: 608 }}
              />
            </div>
          </div>

          <div className="flex items-end justify-center">
            <img
              src="/images/Margarita-padlet.png"
              alt="Margarita junto al Padlet para compartir resultados"
              className="w-full h-152 object-contain object-bottom"
            />
          </div>
        </div>

      </main>
    </div>
  );
}