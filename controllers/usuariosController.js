const {Usuarios} = require('../models');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');


exports.getUsuarios = async (req, res) => { 
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los usuarios' });
    }
}

exports.crearUsuario = async (req, res) => {
    const { idRol, idEstado, correoElectronico, nombreCompleto, password, telefono, fechaNacimiento } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const fecha = new Date();
        const fechaCreacion = fecha.toISOString().slice(0, 19).replace('T', ' ');
        
        const nuevoUsuario = await Usuarios.create({
            idRol,
            idEstado,
            correoElectronico,
            nombreCompleto,
            password: hashedPassword,
            telefono,
            fechaNacimiento,
            fechaCreacion: Sequelize.literal(`'${fechaCreacion}'`),
        });
        
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            data: nuevoUsuario,
        });
    } catch (error) {
        console.log('Error al crear usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear el usuario' });
        
    }
}

exports.updateUsuario = async (req, res) => {   
    const { id } = req.params;
    const { idRol, idEstado, correoElectronico, nombreCompleto, password, telefono, fechaNacimiento } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        usuario.idRol = idRol;
        usuario.idEstado = idEstado;
        usuario.correoElectronico = correoElectronico;
        usuario.nombreCompleto = nombreCompleto;
        usuario.password = hashedPassword;
        usuario.telefono = telefono;
        usuario.fechaNacimiento = fechaNacimiento;

        await usuario.save();

        res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            data: usuario,
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
    }
}