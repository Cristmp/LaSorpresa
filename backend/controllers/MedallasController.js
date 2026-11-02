import { conexiondb } from '../config/db.js';
import jwt from 'jsonwebtoken';
import { actualizarMedallasPorProgreso } from '../services/medallasService.js';

export const getMedallasByCursoId = async (req, res) => {
  try {
    const { id } = req.params; // ID del curso
    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({ mensaje: 'El identificador del curso no es válido' });
    }

    // 1. Detectar opcionalmente si el usuario inició sesión mediante el token JWT
    let id_usuario = null;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        id_usuario = decoded.id || decoded.id_usuario;
      } catch (err) {
        // Token inválido o expirado -> se procesa como invitado
      }
    }

    if (id_usuario) {
      await actualizarMedallasPorProgreso(id_usuario, id);
    }

    const query = `
      SELECT 
        m.id,
        m.id_curso,
        m.nombre,
        m.url_img,
        COALESCE(mu.desbloqueada, 0) AS desbloqueada
      FROM Medallas m
      LEFT JOIN (
        SELECT id_medalla, MAX(desbloqueada) AS desbloqueada
        FROM medallas_usuario
        WHERE id_usuario = ?
        GROUP BY id_medalla
      ) mu ON m.id = mu.id_medalla
      WHERE m.id_curso = ?
      ORDER BY m.id ASC
    `;

    const medallas = await new Promise((resolve, reject) => {
      conexiondb.query(query, [id_usuario || 0, id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    res.status(200).json(medallas.map((medalla) => ({
      ...medalla,
      desbloqueada: Boolean(medalla.desbloqueada),
    })));

  } catch (error) {
    console.error('Error al obtener las medallas del curso:', error);
    res.status(500).json({ mensaje: 'Error al obtener las medallas del curso de la base de datos' });
  }
};