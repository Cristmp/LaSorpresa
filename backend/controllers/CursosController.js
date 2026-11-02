import { conexiondb } from '../config/db.js';

const camposCurso = `
  idCursos,
  nombre_curso,
  descripcion,
  dificultad,
  id_creador,
  portada,
  duracion,
  lecciones,
  precio,
  estado
`;

export const getCursos = async (_req, res) => {
  try {
    const cursos = await new Promise((resolve, reject) => {
      conexiondb.query(
        `SELECT ${camposCurso} FROM Cursos ORDER BY idCursos`,
        (error, results) => {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });

    res.status(200).json(cursos);
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los cursos de la base de datos' });
  }
};

export const getCursoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({ mensaje: 'El identificador del curso no es válido' });
    }

    const cursos = await new Promise((resolve, reject) => {
      conexiondb.query(
        `SELECT ${camposCurso} FROM Cursos WHERE idCursos = ?`,
        [id],
        (error, results) => {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });

    if (cursos.length === 0) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' });
    }

    res.status(200).json(cursos[0]);
  } catch (error) {
    console.error('Error al obtener el curso:', error);
    res.status(500).json({ mensaje: 'Error al obtener el curso de la base de datos' });
  }
};