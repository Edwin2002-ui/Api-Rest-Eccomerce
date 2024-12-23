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
app.use('/api/categorias', require('./routes/categoriasRoutes'));
app.use('/api/estados', require('./routes/estadosRoutes'));
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/orden', require('./routes/ordenesRoutes'));
app.use('/api/clientes', require('./routes/clientesRoutes'));

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
