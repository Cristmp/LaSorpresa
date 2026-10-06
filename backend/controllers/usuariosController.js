import { conexiondb as conexion } from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { promisify } from 'node:util'

const query = promisify(conexion.query).bind(conexion)

export const registro = async (req, res) => {
    const { nombre, correo, contraseña } = req.body

    // Validar que los campos no estén vacíos
    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const hashPassword = bcrypt.hashSync(contraseña, 10)
    
    // Validar que el correo no esté registrado previamente
    try{
        const existingUser = await query('SELECT * FROM usuarios WHERE correo = ?', [correo])
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al verificar el correo' })
    }

    // Insertar el nuevo usuario en la base de datos
    try {
        const nuevoUsuario = await query(
            'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
            [nombre, correo, hashPassword])
        return res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: { id: nuevoUsuario.insertId, nombre, correo }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar el usuario' })
    }
 };

 export const login = async (req, res) => {

    const {correo, contraseña} = req.body;

    // Validar campos obligatorios
    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    // validar si existe el usuario en la base de datos
    try {
        const users = await query(
            'SELECT id, nombre, correo, contraseña, rol FROM usuarios WHERE correo = ?',
            [correo]
        )
        const user = users[0]

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        // Validar la contraseña
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña incorrecta' })
        }

        //Generar JWT
        const token = jwt.sign({ id: user.id, role: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' })
        const safeUser = { ...user }
        delete safeUser.contraseña
        res.status(200).json({ message: 'Inicio de sesión exitoso', token, user: safeUser })
    } catch (error) {
        return res.status(500).json({ message: 'Error al validar el usuario' })
    }
 }