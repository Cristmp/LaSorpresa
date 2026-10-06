import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OfertasPage() {
  const navigate = useNavigate();

  // Lista de banners de ofertas configurados con el ID correspondiente de tu BD
  const ofertasBanners = [
    {
      id: 10,
      imagen: 'https://i.ibb.co/kV0KXdt7/monedero.jpg', // Ajusta las rutas según donde tengas tus Assets
      alt: 'Oferta Monedero',
    },
    {
      id: 5,
      imagen: 'https://i.ibb.co/4Rn4NGW7/taza.jpg',
      alt: 'Oferta Taza',
    },
    {
      id: 4,
      imagen: 'https://i.ibb.co/7JhLwjTp/llavero.jpg',
      alt: 'Oferta Llavero',
    },
  ];

  const handleBannerClick = (productoId) => {
    navigate(`/producto/${productoId}`);
  };

  return (
    <div className="bg-[#22282A] min-h-screen pt-24 pb-12">
      <main className="w-[90%] sm:w-[80%] mx-auto flex flex-col gap-5 p-2.5">
        {ofertasBanners.map((banner) => (
          <div
            key={banner.id}
            onClick={() => handleBannerClick(banner.id)}
            className="w-full rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_10px_rgba(2,0,8,0.53)] bg-white transition-transform hover:scale-[1.01]"
          >
            <img
              src={banner.imagen}
              alt={banner.alt}
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </main>
    </div>
  );
}