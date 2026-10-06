import {conexiondb} from '../config/db.js'

export const getCarruselItems = (req, res) => {
  const query = 'SELECT id, title, description, image FROM carrusel_items ORDER BY id ASC';

  conexiondb.query(query, (error, results) => {
    if (error) {
      console.error('Error en getCarruselItems:', error);
      return res.status(500).json({
        message: 'Error al obtener los datos del carrusel',
        error: error.message
      });
    }

    return res.status(200).json(results);
  });
};