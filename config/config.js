require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: 'America/Guatemala',
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true', 
      },
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: 'America/Guatemala',
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
      },
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: 'America/Guatemala',
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
      },
    },
  },
};
