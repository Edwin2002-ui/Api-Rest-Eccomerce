const {Producto} = require('../models');


exports.getProductos = async (req, res) => {
    try {
      const productos = await Producto.findAll();
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
    }
}


