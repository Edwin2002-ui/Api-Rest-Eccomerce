const {Productos, Usuarios, CategoriaProductos,Estados } = require('../models');
const { v4: uuidv4 } = require('uuid');


exports.getProductos = async (req, res) => {
    try {
      const productos = await Productos.findAll();
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
    }
}


exports.createProducto = async (req, res) => {
  try {
    const Sequelize = require('sequelize');
    const { idUsuario, idCategoriaProducto, idEstado, nombre,detalle, marca, codigo, stock, precio,foto,generarCodigo } = req.body;
    const fecha = new Date();
    const fechaCreacion = fecha.toISOString().slice(0, 19).replace('T', ' ');

    let codigoFinal;

    if (generarCodigo){
      codigoFinal = `PROD-${uuidv4().split('-')[0]}`;
    }else{
      if (!codigo) {
        return res.status(400).json({ error: 'Debe proporcionar un código si no desea generarlo automáticamente.' });
      }

      const productoExistente = await Productos.findOne({ where: { codigo } });
      if (productoExistente) {
        return res.status(400).json({ error: 'El código de producto ya existe' });
      }

      codigoFinal = codigo;
    }

    // Validamos relaciones
    const usuario = await Usuarios.findByPk(idUsuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const categoria = await CategoriaProductos.findByPk(idCategoriaProducto);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const estado = await Estados.findByPk(idEstado);
    if (!estado) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    // Crear producto
    const nuevoProducto = await Productos.create({
      idUsuario,
      idCategoriaProducto,
      idEstado,
      nombre,
      detalle,
      marca,
      codigo: codigoFinal,
      stock,
      precio,
      foto,
      fechaCreacion: Sequelize.literal(`'${fechaCreacion}'`),
    });

    // res.status(201).json(fechaCreacion);
    res.status(201).json({
      message: 'Producto creado exitosamente',
      data: nuevoProducto,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el producto' });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { idCategoriaProducto, idEstado, nombre, marca, codigo, stock, precio, detalle } = req.body;

    // consultamos al producto 
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Validar relaciones
    if (idCategoriaProducto) {
      const categoria = await CategoriaProductos.findByPk(idCategoriaProducto);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
    }

    if (idEstado) {
      const estado = await Estados.findByPk(idEstado);
      if (!estado) {
        return res.status(404).json({ error: 'Estado no encontrado' });
      }
    }

    // Validar que el código no esté duplicado (si se envía un nuevo código)
    if (codigo && codigo !== producto.codigo) {
      const productoExistente = await Productos.findOne({ where: { codigo } });
      if (productoExistente) {
        return res.status(400).json({ error: 'El código de producto ya existe' });
      }
    }

    // Verificar si hay una nueva foto
    const foto = req.file ? req.file.buffer : undefined;

    // Creamos un objeto con los campos a actualizar
    const camposActualizados = {};
    if (idCategoriaProducto !== undefined) camposActualizados.idCategoriaProducto = idCategoriaProducto;
    if (idEstado !== undefined) camposActualizados.idEstado = idEstado;
    if (nombre !== undefined) camposActualizados.nombre = nombre;
    if (marca !== undefined) camposActualizados.marca = marca;
    if (codigo !== undefined) camposActualizados.codigo = codigo;
    if (stock !== undefined) camposActualizados.stock = stock;
    if (precio !== undefined) camposActualizados.precio = precio;
    if (detalle !== undefined) camposActualizados.detalle = detalle;
    if (foto !== undefined) camposActualizados.foto = foto;


    await producto.update(camposActualizados);

    res.status(200).json({
      message: 'Producto actualziado exitosamente',
      data: producto,
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el producto' });
  }
};



