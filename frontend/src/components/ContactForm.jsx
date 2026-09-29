import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  const validationErrors = validate(form);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    toast.error("Por favor completa los campos correctamente");
    return;
  }

  setLoading(true);

  try {  
    await emailjs.send(
      "service_imih3lt",
      "template_9zd9zel",
      form,
      "qlcaEwm2OuGTi_UO8"
    );

    toast.success("Mensaje enviado con éxito");

    setForm({
      name: "",
      email: "",
      message: "",
    });

  } catch (error) {
    console.error(error);
    toast.error("Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
  } finally {
    setLoading(false);
  }
};

const validate = (form) => {
  const errors = {};

  // Nombre
  if (!form.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (form.name.trim().length < 3) {
    errors.name = "Debe tener al menos 3 caracteres";
  }

  // Correo
  if (!form.email.trim()) {
    errors.email = "El correo es obligatorio";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.email = "Correo no válido";
  }

  // Mensaje
  if (!form.message.trim()) {
    errors.message = "El mensaje es obligatorio";
  } else if (form.message.length < 20) {
    errors.message =
      "El mensaje debe tener al menos 20 caracteres";
  }

  return errors;
};

  return (
    <form className='w-full h-full rounded-xl flex items-center flex-col p-4 lg:p-8 gap-2 text-white font-poppins' onSubmit={handleSubmit}>
        <h3 className='text-lg lg:text-xl font-bold w-full'>Contáctanos</h3>
            <div className='flex flex-col lg:flex-row gap-4 mt-2 w-full'>
                <div className='w-full lg:w-1/2'>
                    <label htmlFor="name">Nombre</label>
                    <input name="name" type="text" placeholder='tu nombre aquí' value={form.name} onChange={handleChange} className='w-full rounded-lg px-4 py-3 mt-2 bg-[#161B1F] text-white focus:outline-none focus:ring-1 focus:ring-[#3EB0B4]'/>
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className='w-full lg:w-1/2'>
                    <label htmlFor="email">Correo electrónico</label>
                    <input name="email" type="email" placeholder='tu email aquí' value={form.email} onChange={handleChange} className='w-full rounded-lg px-4 py-3 mt-2 bg-[#161B1F] text-white focus:outline-none focus:ring-1 focus:ring-[#3EB0B4]'/>
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email}
                        </p>
                    )}
                </div>
                          
            </div>
            <label htmlFor="" className=' w-full'>Mensaje</label>
            <textarea name="message" id="" cols="30" rows="5" placeholder='ej: Hola! quisiera saber sobre el servicio' value={form.message} onChange={handleChange} className='w-full h-full rounded-xl p-4 bg-[#161B1F] text-white resize-none focus:outline-none focus:ring-1 focus:ring-[#3EB0B4]'></textarea>
            {errors.message && (
                <p className="text-red-500 text-sm">
                    {errors.message}
                </p>
            )}
            <button disabled={loading} className='bg-[#3EB0B4] hover:bg-[#0f0753] active:translate-y-1 hover:text-white text-white font-bold font-poppins py-3 mt-4 px-8 w-full rounded-2xl cursor-pointer text-lg transition-all'>{loading ? "Enviando..." : "Enviar"}</button>
    </form>
  );
}