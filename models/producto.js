'use strict';

module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define('Productos', {
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
    detalle: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    marca: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    codigo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'Productos',
    timestamps: false,
  });

  Productos.associate = (models) => {
    Productos.belongsTo(models.CategoriaProductos, { foreignKey: 'idCategoriaProducto' });
    Productos.belongsTo(models.Usuarios, { foreignKey: 'idUsuario' });
    Productos.belongsTo(models.Estados, { foreignKey: 'idEstado' });
    Productos.hasMany(models.HistorialPrecios, { foreignKey: 'idProducto' });
    Productos.hasMany(models.HistorialStock, { foreignKey: 'idProducto' });
    Productos.hasMany(models.OrdenDetalles, { foreignKey: 'idProducto' });
  };

  return Productos;
};
