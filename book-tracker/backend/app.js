const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base para probar que funciona
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de libros funcionando correctamente 🚀' });
});

const sequelize = require('./models/index');
const User = require('./models/user');
const Book = require('./models/book');

sequelize.sync({ force: false })
  .then(() => console.log('📦 Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const bookRoutes = require('./routes/books');
app.use('/api/libros', bookRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});