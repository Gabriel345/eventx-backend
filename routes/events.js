const express = require('express');
const router = express.Router();
const EventController = require('../controller/eventController');

// Rota para obter todos os eventos
router.get('/', EventController.getAllEvents);

// Rota para criar um novo evento (apenas a página de criação)
router.get('/create', (req, res) => {
  res.status(200).json({ message: 'Página de criação de evento' });
});

// Rota para enviar dados e criar um novo evento
router.post('/create', EventController.createEvent);

// Rota para obter detalhes de um evento específico
router.get('/:id', EventController.getEventById);

// Rota para se registrar em um evento
router.post('/:eventId/register', EventController.registerForEvent);

// Rota para cancelar a inscrição em um evento
router.post('/:eventId/unregister', EventController.unregisterFromEvent);

// Rota para editar um evento
router.post('/:id/edit', EventController.updateEvent);

// Rota para deletar um evento
router.post('/:id/delete', EventController.deleteEvent);

module.exports = router;
