'use strict';

module.exports = (sequelize, DataTypes) => {
  const CategoriaProductos = sequelize.define('CategoriaProductos', {
    idCategoriaProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'CategoriaProductos',
    timestamps: false,
  });

  CategoriaProductos.associate = (models) => {
    CategoriaProductos.hasMany(models.Productos, { foreignKey: 'idCategoriaProducto' });
  };

  return CategoriaProductos;
};
