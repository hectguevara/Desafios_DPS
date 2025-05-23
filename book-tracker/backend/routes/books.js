const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const verificarToken = require('../middleware/auth');

// Obtener libros del usuario autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const libros = await Book.findAll({ where: { userId: req.user.id } });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

// Agregar libro
router.post('/', verificarToken, async (req, res) => {
  const { titulo, autor, estado, comentario, fechaInicio, fechaFin } = req.body;
  try {
    const libro = await Book.create({
      titulo,
      autor,
      estado,
      comentario,
      fechaInicio,
      fechaFin,
      userId: req.user.id
    });
    res.status(201).json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar libro' });
  }
});

// Actualizar libro
router.put('/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, estado, comentario, fechaInicio, fechaFin } = req.body;
  try {
    const libro = await Book.findOne({ where: { id, userId: req.user.id } });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

    await libro.update({ titulo, autor, estado, comentario, fechaInicio, fechaFin });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar libro' });
  }
});

// Eliminar libro
router.delete('/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const libro = await Book.findOne({ where: { id, userId: req.user.id } });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

    await libro.destroy();
    res.json({ mensaje: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar libro' });
  }
});

module.exports = router;