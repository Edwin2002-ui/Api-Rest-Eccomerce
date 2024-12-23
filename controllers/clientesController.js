const {Clientes} = require ('../models');
const Sequelize = require('sequelize');

exports.crearCliente = async (req, res) => {

    try {
     const {razonSocial,nombreComercial,telefono,email} = req.body;
     const fecha = new Date();
     const fechaCreacion = fecha.toISOString().slice(0, 19).replace('T', ' ');

     const nuevoCliente = await Clientes.create({
        razonSocial,
        nombreComercial,
        telefono,
        email,
        fechaCreacion: Sequelize.literal(`'${fechaCreacion}'`),
    });

     res.status(201).json({
        message : 'Cliente creado exitosamente',
        data: nuevoCliente,
     })

    } catch (error) {

        console.log('Error al crear cliente:', error);
        res.status(500).json({error: 'Ocurrió un error al crear el cliente'});
        

    }

}

exports.updateCliente = async (req, res) => {
    const {id} = req.params;
    const {razonSocial, nombreComercial, telefono, email} = req.body;

    

    try {
        const cliente = await Clientes.findByPk(id);
        if (!cliente) {
            return res.status(404).json({error: 'Cliente no encontrado'});
        }

        cliente.razonSocial = razonSocial;
        cliente.nombreComercial = nombreComercial;
        cliente.telefono = telefono;
        cliente.email = email;
        await cliente.save();

        res.status(200).json({
            message: 'Cliente actualizado exitosamente',
            data: cliente,
        });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({error: 'Ocurrió un error al actualizar el cliente'});
        
    }
}