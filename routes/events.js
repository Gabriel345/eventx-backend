const express = require('express');
const router = express.Router();
const EventController = require('../controller/eventController');

// Rota para obter todos os eventos
router.get('/', EventController.getAllEvents);

// Rota para criar um novo evento
router.post('/', EventController.createEvent); // Método POST em /events

// Rota para obter detalhes de um evento específico
router.get('/:id', EventController.getEventById);

// Rota para se registrar em um evento
router.post('/:eventId/register', EventController.registerForEvent);

// Rota para cancelar a inscrição em um evento
router.post('/:eventId/unregister', EventController.unregisterFromEvent);

// Rota para editar um evento
router.put('/:id', EventController.updateEvent); // Método PUT em /events/:id

// Rota para deletar um evento
router.delete('/:id', EventController.deleteEvent); // Método DELETE em /events/:id

module.exports = router;
