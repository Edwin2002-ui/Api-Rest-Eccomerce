const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Definir rutas
router.get('/', productoController.getProductos); // Listar todos los productos

// router.post('/', productoController.createProducto); // Crear un nuevo producto
// router.put('/:id', productoController.updateProducto); // Actualizar un producto por ID
// router.delete('/:id', productoController.deleteProducto); // Eliminar un producto por ID

module.exports = router;
