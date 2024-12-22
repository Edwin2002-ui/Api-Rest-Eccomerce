'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrdenDetalles = sequelize.define('OrdenDetalles', {
    idOrdenDetalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idOrden: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'OrdenDetalles',
    timestamps: false,
  });

  OrdenDetalles.associate = (models) => {
    OrdenDetalles.belongsTo(models.Orden, { foreignKey: 'idOrden' });
    OrdenDetalles.belongsTo(models.Productos, { foreignKey: 'idProducto' });
  };

  return OrdenDetalles;
};
