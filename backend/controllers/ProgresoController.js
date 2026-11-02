import { conexiondb } from '../config/db.js';
import { actualizarMedallasPorProgreso } from '../services/medallasService.js';

// 1. Guardar un intento de evaluación y actualizar progreso si aprueba
export const registrarIntentoEvaluacion = (req, res) => {
  const usuarioId = req.user?.id;
  const { capitulo_id, puntaje, aprobado } = req.body;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No se pudo identificar al usuario.' });
  }

  if (!capitulo_id || puntaje === undefined || aprobado === undefined) {
    return res.status(400).json({ error: 'Faltan datos obligatorios (capitulo_id, puntaje, aprobado).' });
  }

  // Insertar el intento en el historial
  const queryIntento = `
    INSERT INTO intentos_evaluacion (usuario_id, capitulo_id, puntaje, aprobado, fecha_intento) 
    VALUES (?, ?, ?, ?, NOW())
  `;

  conexiondb.query(queryIntento, [usuarioId, capitulo_id, puntaje, aprobado], (err, resultadoIntento) => {
    if (err) {
      console.error('Error al registrar el intento:', err);
      return res.status(500).json({ error: 'Error al registrar el intento de evaluación.' });
    }

    // Si el usuario aprobó el examen, actualizamos o insertamos en la tabla de progreso
    if (aprobado) {
      const queryProgreso = `
        INSERT INTO progreso_usuarios (usuario_id, capitulo_id, completado, fecha_completado) 
        VALUES (?, ?, TRUE, NOW())
        ON DUPLICATE KEY UPDATE completado = TRUE, fecha_completado = NOW()
      `;

      conexiondb.query(queryProgreso, [usuarioId, capitulo_id], (errProgreso) => {
        if (errProgreso) {
          console.error('Error al actualizar el progreso:', errProgreso);
          return res.status(500).json({ error: 'Intento guardado, pero falló la actualización del progreso.' });
        }

        conexiondb.query(
          'SELECT curso_id FROM Videos WHERE id = ?',
          [capitulo_id],
          async (errCurso, cursos) => {
            if (errCurso || cursos.length === 0) {
              console.error('Error al obtener el curso del capítulo:', errCurso);
              return res.status(500).json({
                error: 'Progreso guardado, pero no se pudo actualizar el estado de las medallas.',
              });
            }

            try {
              await actualizarMedallasPorProgreso(usuarioId, cursos[0].curso_id);
              return res.json({
                mensaje: '¡Evaluación aprobada, progreso y medallas guardados con éxito!',
                aprobado: true,
              });
            } catch (error) {
              console.error('Error al actualizar las medallas del usuario:', error);
              return res.status(500).json({
                error: 'Progreso guardado, pero falló la actualización de las medallas.',
              });
            }
          }
        );
      });
    } else {
      return res.json({ mensaje: 'Intento registrado. No alcanzaste el puntaje para aprobar.', aprobado: false });
    }
  });
};

// 2. Obtener el progreso del usuario para un curso específico (para marcar checks y desbloquear videos al cargar la página)
export const obtenerProgresoCurso = (req, res) => {
  const usuarioId = req.user?.id;
  const { cursoId } = req.params;

  if (!usuarioId) {
    return res.status(401).json({ error: 'No se pudo identificar al usuario.' });
  }

  const query = `
    SELECT p.capitulo_id, p.completado 
    FROM progreso_usuarios p
    INNER JOIN Videos v ON p.capitulo_id = v.id
    WHERE p.usuario_id = ? AND v.curso_id = ?
  `;

  conexiondb.query(query, [usuarioId, cursoId], (err, results) => {
    if (err) {
      console.error('Error al obtener el progreso:', err);
      return res.status(500).json({ error: 'Error al cargar el progreso del usuario.' });
    }

    res.json(results);
  });
};