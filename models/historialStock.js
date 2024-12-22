'use strict';

module.exports = (sequelize, DataTypes) => {
  const HistorialStock = sequelize.define('HistorialStock', {
    idHistorialStock: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidadAnterior: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidadNueva: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fechaCambio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'HistorialStock',
    timestamps: false,
  });

  HistorialStock.associate = (models) => {
    HistorialStock.belongsTo(models.Productos, { foreignKey: 'idProducto' });
  };

  return HistorialStock;
};
