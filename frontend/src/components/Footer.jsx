import React from 'react'
import Logo from '../assets/LaSorpresaLogo.svg';
import {
FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaTiktok 
} from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className="w-full h-[60vh] max-lg:h-auto max-lg:py-10 bg-linear-to-b from-[#22282A]  to-[#191D1E] flex justify-center items-center border-t border-[#646D61]">
                <div className="w-[80%] max-lg:w-[90%] h-full max-lg:h-auto flex max-lg:flex-col justify-between items-center max-lg:gap-12">
                  <section className="text-white w-[70%] max-lg:w-full h-[70%] max-lg:h-auto flex flex-col justify-between max-lg:gap-8">
                    <div className="flex flex-col gap-4 max-lg:items-center max-lg:text-center">
                      <img src={Logo} className="w-50" alt="Logo" />
                      <div>
                        <h2 className="text-xl font-semibold max-lg:text-lg">Síguenos en nuestras redes sociales!</h2>
                        <p className="text-sm text-gray-300">El corazón de Nicaragua envuelto en cada pieza.</p>
                      </div>
        
                      <div className="flex gap-2 justify-start max-lg:justify-center mt-2">
                        {[
                          { icon: FaFacebookF },
                          { icon: FaInstagram },
                          { icon: FaWhatsapp },
                          { icon: FaTiktok }
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <div key={i} className="border border-[#b6b6b6] w-12.5 h-12.5 bg-linear-to-b from-[#6f726e] via-[#6f726e]/20 to-[#b6b6b6] rounded-full flex justify-center items-center text-white text-xl cursor-pointer hover:bg-[#b6b6b6] hover:text-[#191D1E] hover:border-[#191D1E] hover:-translate-y-1 transition-all duration-100">
                              <Icon />
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">envía un correo electronico a Artesanialasopresa@gmail.com</p>
                    </div>
        
                    <div className="text-[#b6b6b6] border-t border-[#646D61] pt-2.5 flex max-lg:flex-col justify-between max-lg:items-center max-lg:text-center max-lg:gap-4">
                      <div className="flex gap-2.5 text-white justify-center">
                        <a href="#" className="text-white no-underline hover:underline"><p>Política de Privacidad</p></a>|
                        <a href="#" className="text-white no-underline hover:underline"><p>Términos y Condiciones</p></a>
                      </div>
                      <p className="text-xs">Copyright © 2026 Artesanía la Sorpresa. Todos los derechos reservados.</p>
                    </div>
                  </section>
        
                  <section className="flex flex-col gap-2.5 text-white w-[25%] max-lg:w-full h-[70%] max-lg:h-auto justify-between max-lg:gap-6">
                    <div className="max-lg:text-center">
                      <h3 className="text-lg font-bold">Listo para navegar?</h3>
                    </div>
        
                    <div className="flex gap-2.5 w-full justify-between max-lg:justify-around max-lg:text-center">
                      <div>
                        <p className="font-bold">Información</p>
                        <ul className="mt-5 list-none flex flex-col gap-2.5">
                          <li><a href="#home" className="text-white no-underline hover:underline">Acerca de nosotros</a></li>
                          <li><a href="#products" className="text-white no-underline hover:underline">Reportar problema</a></li>
                          <li><a href="#about" className="text-white no-underline hover:underline">Ayuda</a></li>
                        </ul>
                      </div>
        
                      <div>
                        <p className="font-bold">Servicio al cliente</p>
                        <ul className="mt-5 list-none flex flex-col gap-2.5">
                          <li><a href="#home" className="text-white no-underline hover:underline">Preguntas frecuentes</a></li>
                          <li><a href="#products" className="text-white no-underline hover:underline">Contacto</a></li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
  )
}

export default Footer