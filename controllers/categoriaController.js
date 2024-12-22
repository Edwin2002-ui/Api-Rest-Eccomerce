const {CategoriaProductos} = require('../models');

exports.getCategorias = async (req, res) => {    
    try {
        const categorias = await CategoriaProductos.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener las categorias' });
    }
}

exports.createCategoria = async (req, res) => {
    try {
        const {nombre} = req.body;
        const nuevaCategoria = await CategoriaProductos.create({nombre});
        res.status(201).json({
            message: 'Categoria creada exitosamente',
            data: nuevaCategoria,
        });
    } catch (error) {
        console.error('Error al crear categoria:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear la categoria' });
    }
}

exports.updateCategoria = async (req, res) => {        
    try {
        const {id} = req.params;
        const {nombre} = req.body;
        const categoria = await CategoriaProductos.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        categoria.nombre = nombre;
        await categoria.save();
        res.status(200).json({
            message: 'Categoria actualizada exitosamente',
            data: categoria,
        });
    } catch (error) {
        console.error('Error al actualizar categoria:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar la categoria' });
    }
}