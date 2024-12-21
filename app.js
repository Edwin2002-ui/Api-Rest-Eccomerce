require('dotenv').config();
const express = require('express');
const { sequelize,} = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/roles', require('./routes/rolRoutes'));

// Sincroniza con la base de datos y arranca el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
