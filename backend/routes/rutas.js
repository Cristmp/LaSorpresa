import { Router } from 'express'
import { registro, login } from '../controllers/usuariosController.js'
import { getProductoById, getProductos } from '../controllers/ProductosController.js'

const router = Router()

router.post('/registro', registro)
router.post('/login', login)

router.get('/productos', getProductos)
router.get('/productos/:id', getProductoById)

export default router