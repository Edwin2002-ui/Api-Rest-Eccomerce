// controllers/rolController.js
const { Rol } = require('../models');

exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los roles' });
  }
};