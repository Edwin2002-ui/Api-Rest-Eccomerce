'use strict';

module.exports = (sequelize, DataTypes) => {
  const Direcciones = sequelize.define('Direcciones', {
    idDireccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    codigoPostal: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: 'Direcciones',
    timestamps: false,
  });

  Direcciones.associate = (models) => {
    Direcciones.belongsTo(models.Usuarios, { foreignKey: 'idUsuario' });
    Direcciones.belongsTo(models.Clientes, { foreignKey: 'idCliente' });
  };

  return Direcciones;
};
