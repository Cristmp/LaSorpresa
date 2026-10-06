import { conexiondb } from '../config/db.js';

const queryAsync = (query, params = []) => {
  return new Promise((resolve, reject) => {
    conexiondb.query(query, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const getOpcionesPersonalizacion = async (req, res) => {
  try {
    const productos = await queryAsync('SELECT idProductoP AS id, nombreP AS nombre, img_producto, precio FROM Producto_personalizado');
    const colores = await queryAsync('SELECT idColor AS id, nombre, hex FROM Color');
    const tallasRows = await queryAsync('SELECT idTalla AS id, tallas AS nombre, precio_ad FROM Tallas');
    const telasRows = await queryAsync('SELECT idTelas AS id, nombre, precio_ad FROM Telas');

    const tallas = tallasRows.map(t => ({ ...t, precio_ad: parseFloat(t.precio_ad) || 0 }));
    const telas = telasRows.map(t => ({ ...t, precio_ad: parseFloat(t.precio_ad) || 0 }));

    res.status(200).json({ productos, colores, tallas, telas });
  } catch (error) {
    console.error('Error al obtener opciones de personalización:', error);
    res.status(500).json({ mensaje: 'Error al obtener opciones de personalización' });
  }
};


export const crearPedidoPersonalizado = async (req, res) => {
  try {
    
    const id_usuario = req.user?.id || req.user?.id_usuario; 

    if (!id_usuario) {
      return res.status(401).json({ mensaje: 'No autorizado. Usuario no identificado en el token.' });
    }

    // Verificar usuario existente
    const userRows = await queryAsync('SELECT id FROM Usuarios WHERE id = ?', [id_usuario]);
    if (userRows.length === 0) {
      return res.status(404).json({ mensaje: 'El usuario no existe en la base de datos.' });
    }

    const { id_producto, id_color, id_talla, id_tela, nota_cliente } = req.body;

    if (!id_producto || !id_color || !id_talla || !id_tela) {
      return res.status(400).json({ mensaje: 'Todos los campos de personalización son obligatorios.' });
    }

    // Calculo del precio total
    const prodRows = await queryAsync('SELECT precio FROM Producto_personalizado WHERE idProductoP = ?', [id_producto]);
    const tallaRows = await queryAsync('SELECT precio_ad FROM Tallas WHERE idTalla = ?', [id_talla]);
    const telaRows = await queryAsync('SELECT precio_ad FROM Telas WHERE idTelas = ?', [id_tela]);

    if (prodRows.length === 0) {
      return res.status(404).json({ mensaje: 'El producto personalizado no existe.' });
    }

    const precioBase = parseFloat(prodRows[0].precio) || 0;
    const extraTalla = tallaRows.length > 0 ? (parseFloat(tallaRows[0].precio_ad) || 0) : 0;
    const extraTela = telaRows.length > 0 ? (parseFloat(telaRows[0].precio_ad) || 0) : 0;

    const totalCalculado = precioBase + extraTalla + extraTela;

    // Guardar Pedido
    const queryPedido = 'INSERT INTO Pedidos (Usuario, fecha, estado, total) VALUES (?, NOW(), "Pendiente", ?)';
    const resPedido = await queryAsync(queryPedido, [id_usuario, totalCalculado]);
    const idPedidoGenerado = resPedido.insertId;

    const queryDetalle = `
      INSERT INTO detalles_pedido (id_pedido, id_producto, id_color, id_talla, id_tela, nota_cliente) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await queryAsync(queryDetalle, [idPedidoGenerado, id_producto, id_color, id_talla, id_tela, nota_cliente || null]);

    res.status(201).json({
      mensaje: '¡Pedido personalizado registrado con éxito!',
      id_pedido: idPedidoGenerado,
      total: totalCalculado
    });

  } catch (error) {
    console.error('Error al registrar el pedido personalizado:', error);
    res.status(500).json({ mensaje: 'Error al registrar el pedido en el servidor' });
  }
};