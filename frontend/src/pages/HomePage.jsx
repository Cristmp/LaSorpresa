import React, { useState } from 'react';
import Logo from '../assets/LaSorpresaLogo.svg';
import video from '../assets/Video-ArtesaniaLaSorpresa.mp4';
import artesaniaHome from '../assets/ArtesaniaHome.svg';
import fondoArtesania from '../assets/fondoArtesania.jpg';
import fondoArtesania2 from '../assets/fondoArtesania2.jpg';
import artesaniaCard from '../assets/IMG_7335.jpg';
import recursoOfertas from '../assets/recursoOfertas.svg';
import { Link } from 'react-router-dom';
import { AiFillMessage } from "react-icons/ai";
import { IoMdPricetag, IoIosArrowForward } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {  
  FaBottleDroplet, 
  FaHandsHoldingCircle, 
  FaEnvelope, 
  FaCommentDots, 
  FaPhone, 
  FaTag, 
  FaAngleRight, 
} from 'react-icons/fa6';
import ContactForm from '../components/ContactForm';

export default function ArtesaniasLaSorpresa({ onOpenLogin }) {

  return (
    <div className="bg-[#22282A] text-white font-poppins min-h-screen selection:bg-[#E96324] selection:text-white">
      
      {/* SECCIÓN 1: INICIO */}
      <main className="w-full mt-8 min-h-[90vh] bg-[radial-gradient(circle_at_bottom_right,rgba(108,193,197,1)_0%,rgba(34,40,42,1)_30%)] flex justify-center items-center relative max-lg:p-24 max-lg:px-4 max-lg:h-auto max-lg:min-h-0">
        <img src="/images/zigzag-N.svg" alt="" className="w-75 max-lg:w-37.5 absolute top-0 left-0" />
        <img src="/images/zigzag-V.svg" alt="" className="w-75 absolute bottom-0 right-0 max-lg:hidden" />

        <div className="w-[60%] max-lg:w-[90%] grid grid-cols-2 max-lg:grid-cols-1 items-center justify-items-center text-white z-20 max-lg:gap-8 max-lg:text-center">
          <section className="flex flex-col items-start max-lg:items-center gap-4">
            <img src={Logo} alt="Logo" className="w-75 mt-12" />
            <div>
              <h1 className="font-dm-serif-text text-5xl max-lg:text-[2.2rem] max-lg:leading-[2.6rem] mb-2 leading-12 font-normal">
                Te damos una cordial bienvenida
              </h1>
              <p className="font-poppins">
                Conoce nuestros productos y servicios, somos un negocio comprometido con entregarle al cliente un trabajo de calidad.
              </p>
            </div>

            <button onClick={onOpenLogin} className="bg-[#E96324] hover:bg-[#9e2611] text-white px-16 py-2 rounded-xl font-dm-serif-text text-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0px_8px_8px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-100 cursor-pointer mt-4">
              <p>Iniciar</p>
            </button>
          </section>

          <section className="w-162.5 max-lg:w-full flex justify-start max-lg:justify-center">
            <img src={artesaniaHome} alt="Imagen sección 1" className="max-lg:w-full max-lg:max-w-100 max-lg:h-auto" />
          </section>
        </div>
      </main>

      {/* SECCIÓN 2: VIDEO DE PRESENTACIÓN */}
      <main className="relative z-0 h-screen max-lg:h-auto max-lg:py-16 max-lg:px-4 flex justify-center items-center text-center bg-center">
        <img src={fondoArtesania2} alt="" className="absolute inset-0 z-0 w-full h-full object-cover saturate-0" />

        <div className="relative z-10 w-[80%] max-lg:w-[95%] flex flex-col items-center gap-8">
          <div className="text-white">
            <h1 className="font-dm-serif-text text-4xl font-normal bg-black inline-block px-4 py-2.25">
              ¿Quiénes somos?
            </h1>
            <br />
            <p className="font-poppins mt-2.5 bg-black inline-block px-4 py-1.25">
              Somos un negocio dedicado a la distribución de artesanías, con el fin de preservar y llevar la cultura a todo Estelí, ofreciendo productos de la mejor calidad
            </p>
          </div>

          <div className="flex max-lg:flex-col justify-center items-center mt-8 h-[45vh] max-lg:h-auto gap-16 max-lg:gap-8 w-full">
            <section className="w-1/2 max-lg:w-full max-lg:max-w-125 h-full rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] grid">
              <video controls preload="metadata" className="w-full h-full rounded-xl object-cover">
                <source src={video} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </section>

            <section className="w-75 max-lg:w-full max-lg:max-w-125 h-full bg-linear-to-b from-[#262626] via-[#262626]/44 to-transparent rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-start text-left max-lg:text-center gap-2.5 text-white p-8">
              <h3 className="font-dm-serif-text font-normal text-2xl">¿Qué ofrecemos?</h3>
              <p className="font-poppins">Ofrecemos una amplia variedad de productos, desde tazas, camisetas, llaveros, entre otros.</p>
            </section>
          </div>
        </div>
      </main>

      {/* SECCIÓN 3: CATÁLOGO */}
      <main className="min-h-[50vh] max-lg:h-auto max-lg:py-16 max-lg:px-4 bg-[radial-gradient(ellipse_at_top_center,rgba(100,109,97,1)_0%,rgba(34,40,42,1)_40%)] flex justify-center items-center border-t border-[#818181]">
        <div className="w-full flex flex-col items-center">
          <section className="text-center text-white mb-8">
            <h2 className="font-dm-serif-text text-3xl font-normal">Explora nuestro catálogo</h2>
            <p>Explora los mejores productos que podrás encontrar</p>
          </section>

          <section className="w-[65%] max-lg:w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-2">
            {[
              { img: fondoArtesania, title: "Decoración" },
              { img: "https://i.ibb.co/BVtmMVQL/Contenido-4.jpg", title: "Del hogar" },
              { img: "https://i.ibb.co/RkKffDSc/traje-t-pico.jpg", title: "Vestimenta" },
              { img: "https://i.ibb.co/BVc47XhF/pyrp-vingeran-GKk7d-qvl2-A-unsplash.jpg", title: "Accesorios" },
              { img: "https://i.ibb.co/pryL9tRS/mu-ecas-de-tusa.jpg", title: "Más" }
            ].map((card, idx) => (
              <a href="./Pages/CatalogoPage.html" key={idx} className="no-underline text-black w-full max-w-62.5 max-lg:max-w-65">
                <div className="bg-[#181717] rounded-xl shadow-[0px_6px_8px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center p-5 gap-4 font-medium transition-all duration-200 hover:-translate-y-1 hover:bg-[#2e3336] text-white">
                  <div className="w-full h-37.5 overflow-hidden flex justify-center rounded-md">
                    <img src={card.img} alt={card.title} className="w-75 h-50 object-cover rounded-md" />
                  </div>
                  <p>{card.title}</p>
                </div>
              </a>
            ))}
          </section>
        </div>
      </main>

      {/* SECCIÓN 4: MISIÓN / VISIÓN */}
      <main className="h-screen max-lg:h-auto max-lg:py-16 max-lg:px-4 bg-[#22282A] flex justify-center items-center border-b-2 border-dashed border-[#646D61]">
        <div className="w-[80%] max-lg:w-full h-full flex max-lg:flex-col justify-center items-center gap-40 max-lg:gap-16">
          <section className="relative w-full max-w-130.5 h-[65vh] max-lg:h-137.5 flex justify-center items-center">
            <div className="w-100 md:w-120 lg:w-130  -rotate-8 h-full bg-[#e4e4e4] rounded-xl shadow-[0px_6px_8px_rgba(0,0,0,0.25)] absolute"></div>
            <div className="relative md:w-120 w-100 lg:w-130 h-[65vh] bg-[#e4e4e4] rounded-xl shadow-[0px_6px_8px_rgba(0,0,0,0.25)] p-8 text-black">
              <img src={artesaniaCard} alt="Artesanía la sorpresa" className="h-[60%] w-full object-cover rounded-md" />
              <div>
                <h2 className="font-bold text-2xl mt-5">Artesanía la sorpresa</h2>
                <p className="text-normal mt-1">Ofrecemos al cliente servicios y productos de calidad enorgulleciéndonos de nuestra cultura.</p>
              </div>
              <div className="mt-5 grid grid-cols-3 max-lg:grid-cols-2 gap-2.5">
                {['Cultural', 'Compromiso', 'Calidad', 'Creatividad'].map((val, i) => (
                  <div key={i} className="flex items-center justify-center text-black bg-[#CAD41D] py-1 px-6 rounded-full cursor-pointer hover:-translate-y-1 transition-transform duration-100 text-sm font-medium">
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-[40%] max-lg:w-full max-lg:max-w-125 h-full flex flex-col justify-center items-start max-lg:items-center max-lg:text-center gap-8 text-white">
            <div className="flex flex-col max-lg:items-center">
              <FaBottleDroplet className="text-[#e96324] text-5xl -ml-3 max-lg:ml-0 mb-2.5" />
              <h2 className="font-dm-serif-text font-normal text-3xl">Misión</h2>
              <p className="mt-2">Convertirnos en un referente de la artesanía tradicional, impulsando el talento de los artesanos y manteniendo vivas las expresiones culturales que forman parte de nuestra identidad.</p>
            </div>

            <div className="flex flex-col max-lg:items-center">
              <FaHandsHoldingCircle className="text-[#e96324] text-5xl -ml-0.5 max-lg:ml-0 mb-2.5" />
              <h2 className="font-dm-serif-text font-normal text-3xl">Visión</h2>
              <p className="mt-2">Convertirnos en los líderes en artesanías personalizadas, siendo reconocidos por nuestra innovación, calidad y compromiso con el cliente.</p>
            </div>
          </section>
        </div>
      </main>

      {/* SECCIÓN 5: OFERTAS */}
      <main className="h-[60vh] max-lg:h-auto max-lg:py-16 max-lg:px-4 bg-linear-to-b from-[#22282A] via-[#22282A]/20 to-[#191D1E] flex justify-center items-center overflow-hidden relative">
        <img src="/images/zigzag-N.svg" alt="" className="absolute w-50 h-50 bottom-0 left-0 -rotate-90" />
        <img src="/images/zigzag-V.svg" alt="" className="absolute w-50 h-50 top-0 right-0 -rotate-90" />

        <div className="w-[60%] max-lg:w-full max-lg:max-w-125 h-[70%] max-lg:h-auto border border-[#646D61] relative grid grid-cols-[60%_40%] max-lg:grid-cols-1 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_bottom_right,rgba(234,255,89,1)_0%,rgba(34,40,42,1)_35%)] max-lg:bg-[radial-gradient(circle_at_bottom,rgba(234,255,89,1)_0%,rgba(34,40,42,1)_35%)]">
          <div className="w-full h-full flex justify-center items-center">
            <section className="w-160 max-lg:w-full flex flex-col justify-around items-center gap-4 text-white text-center p-8 max-lg:py-8 max-lg:px-4">
              <h1 className="text-3xl max-lg:text-2xl font-bold">¡NO TE PIERDAS NUESTROS DESCUENTOS!</h1>
              <p className="text-[1.2rem] font-extralight mb-4">Explora las ofertas que tenemos para tí</p>
              <a href="./Pages/OfertasPage.html" className="no-underline w-full flex justify-center">
                <button className="bg-[#d4d4d4] text-black py-4 px-24 max-lg:w-[80%] max-lg:px-0 rounded-xl font-normal cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:bg-[#161B1F] hover:text-white transition-all duration-200">
                  Ver ofertas
                </button>
              </a>
            </section>
          </div>

          <img src={recursoOfertas} alt="" className="absolute -right-12.5 -top-10 w-125 max-lg:static max-lg:w-[80%] max-lg:mx-auto max-lg:mb-5" />
        </div>
      </main>

        {/*SECTION CONTACTO */}
        <section className='min-h-screen h-auto flex items-center bg-[#22282A]'>
          <div className=' flex flex-col items-center justify-center w-full h-full py-20 lg:py-0'>
                <div>
                    <h1 className='text-white text-3xl lg:text-4xl font-dm-serif-text'>
                      Estamos para ayudarte!
                    </h1>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 w-full md:w-11/12 lg:w-8/12 h-8/12 mt-8 p-4 gap-10'>

                    <div className='grid grid-cols-2 gap-2 lg:gap-8'>
                        <div className='rounded-xl border border-[#dbdbdb] p-4 lg:p-8 flex flex-col justify-evenly lg:justify-between text-white font-poppins'>
                                <div >
                                  <MdEmail color='white' className='size-10 lg:size-14'/>
                                  <h1 className='font-bold text-lg lg:text-xl mt-2 text-balance'>Escribe a nuestro correo</h1>
                                </div>
                          
                                <p className='underline text-xs font-bold'>Lasorpresanic@gmail.com</p>

                                <div>
                                  <p className='text-sm'>Respondemos en 24 horas</p>
                                </div>
                        </div>

                        <div className='rounded-xl border border-[#dbdbdb] p-6 lg:p-8 flex flex-col justify-between text-white font-poppins'>
                                <div >
                                  <AiFillMessage color='white' className='size-10 lg:size-14'/>
                                  <h1 className='font-bold text-lg lg:text-xl mt-2 lg:text-balance'>Envía un mensaje de texto</h1>
                                </div>
                          
                                
                                  <p className=' my-2'>+505 5151 5757</p>
                                

                                <div>
                                  <p className='text-sm'>Lunes - Viernes</p>
                                  <p className='text-sm'>12pm - 8pm</p>
                                </div>
                        </div>

                        <div className='rounded-xl border border-[#dbdbdb] p-6 lg:p-8 flex flex-col justify-evenly text-white font-poppins'>
                                <div >
                                  <FaPhone color='white' className='size-9 lg:size-12'/>
                                  <h1 className='font-bold text-lg lg:text-xl mt-2 lg:text-balance'>Puedes llamarnos</h1>
                                </div>
                          
                                <p className='text-base'>+505 8425 ####</p>

                                <div>
                                  <p className='text-sm '>Lunes - Viernes</p>
                                  <p className='text-sm '>12pm - 8pm</p>
                                </div>
                        </div>

                        <div className=' rounded-xl bg-linear-to-br from-[#3EB0B4] to-[#b4f5ef] justify-between p-4 lg:p-8 flex flex-col'>
                            <div> 
                              <IoMdPricetag color='white' className='size-12 lg:size-14' />
                              <h1 className='text-white font-poppins font-bold text-lg lg:text-xl mt-2'>No conoces nuestros productos?</h1>
                            </div>
                              
                              <Link to={"/prices"} className='mt-2 lg:mt-4 cursor-pointer bg-white hover:bg-[#1D1D27] text-[#1D1D27] shadow-2xl hover:text-white rounded-full transition-all'>
                                <div className='p-2 py-4 font-poppins flex items-center justify-center hover:animate-bounce cursor-pointer'>
                                      <p className='text-sm lg:text-base'>Hecha un vistazo</p>
                                      <IoIosArrowForward className='size-6 lg:size-8' />
                                </div>
                              </Link>

                        </div>
                    </div>

                    <div className='border border-[#dbdbdb] rounded-xl'>
                      <ContactForm/>
                    </div>
                </div>

          </div>
      </section>
    </div>
  );
}