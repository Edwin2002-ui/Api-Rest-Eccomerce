const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estadosController');


// rutas para los estados   
router.get('/', estadosController.getEstados); // Listar todos los estados
router.post('/', estadosController.createEstado); // Crear un estado
router.put('/:id',estadosController.updateEstado); // Actualizar un estado


module.exports = router;