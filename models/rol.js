'use strict';

module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    idRol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    tableName: 'Rol',
    timestamps: false,
  });

  Rol.associate = (models) => {
    Rol.hasMany(models.Usuarios, { foreignKey: 'idRol' });
  };

  return Rol;
}