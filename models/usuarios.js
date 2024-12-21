'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correoElectronico: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    nombreCompleto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Usuarios',
    timestamps: false,
  });

  Usuarios.associate = (models) => {
    Usuarios.belongsTo(models.Rol, { foreignKey: 'idRol' });
    Usuarios.belongsTo(models.Estados, { foreignKey: 'idEstado' });
    Usuarios.hasMany(models.Producto, { foreignKey: 'idUsuario' });
    Usuarios.hasMany(models.Orden, { foreignKey: 'idUsuario' });
  };

  return Usuarios;
};
