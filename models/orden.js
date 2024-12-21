'use strict';

module.exports = (sequelize, DataTypes) => {
  const Orden = sequelize.define('Orden', {
    idOrden: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCliente: {
      type: DataTypes.INTEGER,
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fechaEntrega: {
      type: DataTypes.DATE,
    },
    totalOrden: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'Orden',
    timestamps: false,
  });

  Orden.associate = (models) => {
    Orden.belongsTo(models.Usuarios, { foreignKey: 'idUsuario' });
    Orden.belongsTo(models.Clientes, { foreignKey: 'idCliente' });
    Orden.belongsTo(models.Estados, { foreignKey: 'idEstado' });
    Orden.hasMany(models.OrdenDetalles, { foreignKey: 'idOrden' });
  };

  return Orden;
};
