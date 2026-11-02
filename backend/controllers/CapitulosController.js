import {conexiondb} from '../config/db.js'

export const obtenerCapitulosPorCurso = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT id, curso_id, titulo, descripcion, video_url, pdf_url, orden 
    FROM Videos 
    WHERE curso_id = ? 
    ORDER BY orden ASC
  `;

  conexiondb.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener los capítulos:', err);
      return res.status(500).json({ error: 'Error interno del servidor al cargar los capítulos' });
    }

    res.json(results);
  });
};