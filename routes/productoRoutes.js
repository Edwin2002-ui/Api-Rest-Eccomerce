const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');


// rutas para los productos 
router.get('/', productoController.getProductos); // Listar todos los productos nos servira para el front
router.post('/',productoController.createProducto); // Crear 
router.put('/:id', productoController.updateProducto); // Actualizamos
// router.delete('/:id', productoController.deleteProducto); // Eliminar un producto por ID

module.exports = router;
