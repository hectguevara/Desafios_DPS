const { Sequelize } = require('sequelize');

// Conexión a base SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // El archivo de base se generará automáticamente
});

// Exportar instancia para usar en otros archivos
module.exports = sequelize;