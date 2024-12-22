const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// rutas para los usuarios

router.get('/', usuariosController.getUsuarios); // Listar todos los usuarios   
router.post('/', usuariosController.crearUsuario); // Crear un usuario
router.put('/:id', usuariosController.updateUsuario); // Actualizar un usuario


module.exports = router;