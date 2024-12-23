const express = require('express');
const router = express.Router();
const OrdenController = require ('../controllers/ordenController');

//rutas para las orden por el momento solo encabezado osea ORDEN
// router.get('/', OrdenController.getOrdenes);    
router.get('/:id', OrdenController.getOrdenById)
router.post('/', OrdenController.crearOrden);   
router.put('/:id', OrdenController.updateOrden);    

module.exports = router;