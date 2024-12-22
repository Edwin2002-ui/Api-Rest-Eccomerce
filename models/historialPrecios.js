'use strict';

module.exports = (sequelize, DataTypes) => {
  const HistorialPrecios = sequelize.define('HistorialPrecios', {
    idHistorialPrecio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioAnterior: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precioNuevo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fechaCambio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'HistorialPrecios',
    timestamps: false,
  });

  HistorialPrecios.associate = (models) => {
    HistorialPrecios.belongsTo(models.Productos, { foreignKey: 'idProducto' });
  };

  return HistorialPrecios;
};
