const  {Orden,Usuarios, Clientes ,Estados,OrdenDetalles} = require('../models');
const Sequelize = require('sequelize');


exports.getOrdenById = async (req, res) => {
    const { id } = req.params;
    try {
        // Buscar la orden por su ID incluyendo relaciones
        const orden = await Orden.findByPk(id, {
            include: [
                {
                    model: Usuarios,
                    attributes: ['idUsuario', 'nombreCompleto'],
                },
                {
                    model: Clientes,
                    attributes: ['idCliente', 'nombreComercial'],
                },
                {
                    model: Estados,
                    attributes: ['idEstado', 'nombre'],
                },
                {
                    model: OrdenDetalles,
                    attributes: ['idOrdenDetalle', 'idProducto', 'cantidad', 'precio'],
                },
            ],
        });

        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        // Formatear manualmente las relaciones para evitar problemas con datos nulos, con esto evitamos que el servidor
        // tenga problemas con la respuesta
        const respuesta = {
            idOrden: orden.idOrden,
            idUsuario: orden.idUsuario,
            idCliente: orden.idCliente,
            idEstado: orden.idEstado,
            fechaCreacion: orden.fechaCreacion,
            fechaEntrega: orden.fechaEntrega,
            totalOrden: orden.totalOrden,
            Usuario: orden.Usuario || null, // Usuario será null si no hay relación
            Cliente: orden.Cliente || null, // Cliente será null si no hay relación
            Estado: orden.Estado || null, // Estado será null si no hay relación
            OrdenDetalles: orden.OrdenDetalles || [], // Array vacío si no hay detalles
        };

        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al obtener la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la orden' });
    }
};

//insertamos una orden por el momento solo encabezado
exports.crearOrden = async (req, res) => {
    const { idUsuario, idCliente, idEstado, fechaEntrega, totalOrden } = req.body;
    const fecha = new Date();
    const fechaCreacion = fecha.toISOString().slice(0, 19).replace('T', ' ');

    try {
      const nuevaOrden = await Orden.create({
        idUsuario,
        idCliente,
        idEstado,
        fechaCreacion: Sequelize.literal(`'${fechaCreacion}'`),
        fechaEntrega,
        totalOrden,
      });
      res.status(201).json({
        message: 'Producto creado exitosamente',
        data: nuevaOrden,
      });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear la orden' });
    }
  };

// Actualizar una orden solo encabezado
exports.updateOrden = async (req, res) => {
    const { id } = req.params;
    const { idUsuario, idCliente, idEstado, fechaCreacion, fechaEntrega, totalOrden } = req.body;
    try {
      const orden = await Orden.findByPk(id);
      if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
  
      await orden.update({
        idUsuario,
        idCliente,
        idEstado,
        fechaCreacion,
        fechaEntrega,
        totalOrden,
      });
      res.status(200).json({
        message: 'Producto actualizado exitosamente',
        data: orden,
      });
    } catch (error) {
        console.error('Error al actualizar la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear la orden' });
    }
  };