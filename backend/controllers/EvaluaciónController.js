import { conexiondb } from '../config/db.js';

export const obtenerEvaluacionPorCapitulo = (req, res) => {
  const { id } = req.params; // Aquí 'id' hace referencia al id del capítulo / video

  // 1. Obtenemos las preguntas del capítulo
  const queryPreguntas = 'SELECT id, enunciado FROM preguntas WHERE capitulo_id = ?';

  conexiondb.query(queryPreguntas, [id], async (err, preguntas) => {
    if (err) {
      console.error('Error al obtener las preguntas:', err);
      return res.status(500).json({ error: 'Error interno del servidor al cargar las preguntas' });
    }

    if (preguntas.length === 0) {
      return res.status(404).json({ mensaje: 'No hay evaluación disponible para este capítulo' });
    }

    try {
      // 2. Para cada pregunta, buscamos sus opciones correspondientes
      const evaluacionCompleta = await Promise.all(
        preguntas.map((pregunta) => {
          return new Promise((resolve, reject) => {
            const queryOpciones = 'SELECT id, opcion, correcta FROM opciones WHERE pregunta_id = ?';
            
            conexiondb.query(queryOpciones, [pregunta.id], (errOpciones, opciones) => {
              if (errOpciones) return reject(errOpciones);

              resolve({
                id: pregunta.id,
                enunciado: pregunta.enunciado,
                opciones: opciones.map(op => op.opcion),
                // Guardamos el índice de la opción correcta para validarlo fácilmente
                respuestaCorrecta: opciones.findIndex(op => op.correcta === 1 || op.correcta === true)
              });
            });
          });
        })
      );

      res.json(evaluacionCompleta);
    } catch (error) {
      console.error('Error al procesar las opciones de la evaluación:', error);
      res.status(500).json({ error: 'Error al procesar la evaluación' });
    }
  });
};