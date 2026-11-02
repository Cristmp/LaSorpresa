import { Router } from 'express'
import { registro, login } from '../controllers/usuariosController.js'
import { getProductoById, getProductos } from '../controllers/ProductosController.js'
import { getOpcionesPersonalizacion, crearPedidoPersonalizado } from '../controllers/Personalizacion.js'
import { getCarruselItems } from '../controllers/carruselController.js'
import { getCursoById, getCursos } from '../controllers/CursosController.js'
import { getMedallasByCursoId } from '../controllers/MedallasController.js';
import { obtenerCapitulosPorCurso } from '../controllers/CapitulosController.js';
import { obtenerEvaluacionPorCapitulo } from '../controllers/EvaluaciónController.js';
import { registrarIntentoEvaluacion, obtenerProgresoCurso } from '../controllers/ProgresoController.js';
import verifyToken from '../middlewares/authmiddleware.js' 

const router = Router()

// Rutas Públicas
router.post('/registro', registro)
router.post('/login', login)

router.get('/productos', getProductos)
router.get('/productos/:id', getProductoById)
router.get('/personalizacion/opciones', getOpcionesPersonalizacion)
router.get('/carrusel', getCarruselItems);
router.get('/cursos', getCursos);
router.get('/cursos/:id', getCursoById);
router.get('/cursos/:id/capitulos', obtenerCapitulosPorCurso);
router.get('/cursos/:id/medallas', getMedallasByCursoId);

router.get('/capitulos/:id/evaluacion', obtenerEvaluacionPorCapitulo);

// Ruta Protegida con verifyToken
router.post('/evaluaciones/intentos', verifyToken, registrarIntentoEvaluacion);
router.get('/cursos/:cursoId/progreso', verifyToken, obtenerProgresoCurso);

router.post('/pedidos/personalizado', verifyToken, crearPedidoPersonalizado)

export default router