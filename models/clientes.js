'use strict';

module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    razonSocial: {
      type: DataTypes.STRING(245),
      allowNull: false,
    },
    nombreComercial: {
      type: DataTypes.STRING(245),
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Clientes',
    timestamps: false,
  });

  Clientes.associate = (models) => {
    Clientes.hasMany(models.Orden, { foreignKey: 'idCliente' });
    Clientes.hasMany(models.Direcciones, { foreignKey: 'idCliente' });
  };

  return Clientes;
};
