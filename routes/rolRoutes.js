const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Definir rutas
router.get('/', rolController.getRoles); // Listar todos los roles

module.exports = router;