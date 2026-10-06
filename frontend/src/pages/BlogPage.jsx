import React from 'react';

export default function BlogPage() {
  // Configuración de las revistas o publicaciones en PDF
  const revistas = [
    {
      id: 1,
      titulo: '"Renueva tu hogar" - Artesanías la Sorpresa',
      portada: 'https://i.ibb.co/8nhVvHpR/revista-ims.png', // Ajusta la ruta a tu carpeta public o src/assets
      pdfUrl: 'https://drive.google.com/file/d/1ZtQt8Wnfqho9ePt5JluiJRXRmVaiK08x/view?usp=sharing',
    },
  ];

  return (
    <main className="bg-radial-[at_top] from-[#646D61] via-[#22282A] to-[#22282A] min-h-screen w-full flex items-center justify-center pt-28 pb-16 font-poppins selection:bg-[#E96324] selection:text-white">
      <div className="w-full flex flex-col items-center">
        
        {/* ENCABEZADO */}
        <div className="text-white flex flex-col items-center text-center px-4 mb-8">
          <h2 className="font-dm-serif-text font-normal text-5xl mb-2">
            Nuestro Blog
          </h2>
          <p className="text-gray-300 text-lg">
            Echa un vistazo a nuestras revistas
          </p>
        </div>

        {/* CONTENEDOR DE REVISTAS / PDFs */}
        <div className="w-[90%] max-w-7xl p-4 sm:p-8 flex flex-wrap items-start gap-8">
          {revistas.map((revista) => (
            <a
              key={revista.id}
              href={revista.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline group"
            >
              <div className="bg-[#1e2122] p-5 flex flex-col gap-3 w-full sm:w-112.5 items-center justify-center rounded-xl shadow-[5px_10px_15px_#191D1E] cursor-pointer transition-transform duration-200">
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img
                    src={revista.portada}
                    alt={revista.titulo}
                    className="w-full rounded-lg transition-transform duration-200 group-hover:scale-105 object-cover"
                  />
                </div>
                <h3 className="text-white p-2.5 font-medium text-lg leading-snug">
                  {revista.titulo}
                </h3>
              </div>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}