import { conexiondb } from '../config/db.js';

const ejecutarConsulta = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    conexiondb.query(sql, valores, (error, resultados) => {
      if (error) reject(error);
      else resolve(resultados);
    });
  });

export const actualizarMedallasPorProgreso = async (usuarioId, cursoId) => {
  const capitulos = await ejecutarConsulta(
    `SELECT v.id, p.completado
     FROM Videos v
     LEFT JOIN progreso_usuarios p
       ON p.capitulo_id = v.id AND p.usuario_id = ?
     WHERE v.curso_id = ?
     ORDER BY v.orden ASC, v.id ASC`,
    [usuarioId, cursoId]
  );

  if (capitulos.length === 0) {
    return;
  }

  const capitulosCompletados = capitulos.filter(
    (capitulo, index) => index === 0 || Number(capitulo.completado) === 1
  ).length;
  const porcentajeProgreso = (capitulosCompletados / capitulos.length) * 100;

  const medallas = await ejecutarConsulta(
    'SELECT id FROM Medallas WHERE id_curso = ? ORDER BY id ASC',
    [cursoId]
  );
  const medallasUsuario = await ejecutarConsulta(
    `SELECT id_medalla, MAX(desbloqueada) AS desbloqueada
     FROM medallas_usuario
     WHERE id_usuario = ?
     GROUP BY id_medalla`,
    [usuarioId]
  );
  const medallasDesbloqueadas = new Set(
    medallasUsuario
      .filter((medalla) => Boolean(medalla.desbloqueada))
      .map((medalla) => String(medalla.id_medalla))
  );
  const medallasRegistradas = new Set(
    medallasUsuario.map((medalla) => String(medalla.id_medalla))
  );

  for (const [index, medalla] of medallas.entries()) {
    const porcentajeRequerido = 40 + index * 20;
    if (
      porcentajeProgreso < porcentajeRequerido ||
      medallasDesbloqueadas.has(String(medalla.id))
    ) {
      continue;
    }

    if (medallasRegistradas.has(String(medalla.id))) {
      await ejecutarConsulta(
        `UPDATE medallas_usuario
         SET desbloqueada = TRUE, fecha_ganado = NOW()
         WHERE id_usuario = ? AND id_medalla = ?`,
        [usuarioId, medalla.id]
      );
    } else {
      await ejecutarConsulta(
        `INSERT INTO medallas_usuario (id_usuario, id_medalla, fecha_ganado, desbloqueada)
         VALUES (?, ?, NOW(), TRUE)`,
        [usuarioId, medalla.id]
      );
    }
  }
};
