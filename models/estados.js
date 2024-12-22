'use strict';

module.exports = (sequelize, DataTypes) => {
  const Estados = sequelize.define('Estados', {
    idEstado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    contexto: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    tableName: 'Estados',
    timestamps: false,
  });

  Estados.associate = (models) => {
    Estados.hasMany(models.Usuarios, { foreignKey: 'idEstado' });
    Estados.hasMany(models.Productos, { foreignKey: 'idEstado' });
    Estados.hasMany(models.Orden, { foreignKey: 'idEstado' });
  };

  return Estados;
};
