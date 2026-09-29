import { conexiondb } from '../config/db.js'

export const getProductos = async (req, res, ) => {
    try{
        const query = `
      SELECT 
        p.id,
        p.nombre_producto AS nombre,
        p.descripcion,
        p.precio,
        p.oferta,
        p.txt_oferta AS txtoferta,
        GROUP_CONCAT(DISTINCT i.url_img ORDER BY i.id ASC SEPARATOR ',') AS imagenes,
        GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ',') AS tags
      FROM Productos p
      LEFT JOIN img_productos i ON p.id = i.id_producto
      LEFT JOIN producto_categoria pc ON p.id = pc.producto_id
      LEFT JOIN Categorias c ON pc.categoria_id = c.id
      GROUP BY p.id
    `;

    const rows = await new Promise((resolve, reject) => {
        conexiondb.query(query, (error, results) => {
            if(error) reject(error)
                else resolve(results)
        })
    })

    const productos = rows.map((prod) => ({
      ...prod,
      precio: parseFloat(prod.precio),
      oferta: Boolean(prod.oferta),
      txtoferta: prod.txtoferta || '',
      // Convertir 'url1,url2' en ['url1', 'url2']
      imagen: prod.imagenes ? prod.imagenes.split(',') : [],
      // Convertir 'cerámica,artesanía' en ['cerámica', 'artesanía']
      tags: prod.tags ? prod.tags.split(',') : []
    }));

    res.status(200).json(productos);

    } catch(error) {
        console.error('Error al obetener los productos', error)
        res.status(500).json({ mensaje: "Error al obtener los productos de la base de datos"})
    }
}