import { Router } from 'express'
import { registro, login } from '../controllers/usuariosController.js'
import { getProductos } from '../controllers/ProductosController.js'

const router = Router()

router.post('/registro', registro)
router.post('/login', login)

router.get('/productos', getProductos)

export default router