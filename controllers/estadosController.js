const  {Estados} = require('../models');



exports.getEstados = async (req, res) => {  
    try {
        const estados = await Estados.findAll();
        res.status(200).json(estados);
    } catch (error) {
        console.error('Error al obtener estados:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los estados' });
    }
}

exports.createEstado = async (req, res) => {
    try {
        const {nombre,contexto} = req.body;
        const nuevoEstado = await Estados.create({nombre,contexto});

        res.status(201).json({
            message: 'Estado creado exitosamente',
            data: nuevoEstado,
        });
    } catch (error) {
        console.error('Error al crear estado:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear el estado' });
    }
};

exports.updateEstado = async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre, contexto} = req.body;

        const estado = await Estados.findByPk(id);

        if (!estado) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }

        estado.nombre = nombre;
        estado.contexto = contexto;
        await estado.save();

        res.status(200).json({
            message: 'Estado actualizado exitosamente',
            data: estado,
        });

    } catch (error) {
        console.log('Error al actualizar estado:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el estado' });
    }
};
