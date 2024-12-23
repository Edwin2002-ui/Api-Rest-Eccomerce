const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// rutas para los clientes
// router.get('/', clientesController.getClientes); // Listar todos los clientes
router.post('/', clientesController.crearCliente); // Crear un cliente
router.put('/:id', clientesController.updateCliente); // Actualizar un cliente



module.exports = router;