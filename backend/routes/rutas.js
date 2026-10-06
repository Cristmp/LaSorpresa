import { Router } from 'express'
import { registro, login } from '../controllers/usuariosController.js'
import { getProductoById, getProductos } from '../controllers/ProductosController.js'
import { getOpcionesPersonalizacion, crearPedidoPersonalizado } from '../controllers/Personalizacion.js'
import { getCarruselItems } from '../controllers/carruselController.js'
import verifyToken from '../middlewares/authmiddleware.js' // <-- Importa tu middleware aquí

const router = Router()

// Rutas Públicas
router.post('/registro', registro)
router.post('/login', login)

router.get('/productos', getProductos)
router.get('/productos/:id', getProductoById)
router.get('/personalizacion/opciones', getOpcionesPersonalizacion)
router.get('/carrusel', getCarruselItems);

// Ruta Protegida con verifyToken
router.post('/pedidos/personalizado', verifyToken, crearPedidoPersonalizado)

export default router