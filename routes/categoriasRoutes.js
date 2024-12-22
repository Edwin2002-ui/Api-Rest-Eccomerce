const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');


// rutas para las categorias
router.get('/', categoriaController.getCategorias); // Listar todas las categorias
router.post('/', categoriaController.createCategoria); // Crear una categoria
router.put('/:id', categoriaController.updateCategoria); // Actualizar una categoria
// router.delete('/:id', categoriaController.deleteCategoria); // Eliminar una categoria por ID

module.exports = router;