'use strict';

module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    idProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCategoriaProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    codigo: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    foto: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Productos', // Nombre de la tabla en la base de datos
    timestamps: false, // Si no usas createdAt y updatedAt
  });

  // Opcional: Si tienes relaciones, puedes definirlas aquí
  Producto.associate = (models) => {
    // Ejemplo de relación:
    // Producto.belongsTo(models.Categoria, { foreignKey: 'idCategoriaProducto' });
  };

  return Producto;
};
