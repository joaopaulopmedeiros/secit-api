const events = require('express').Router();

const EventController = require('../../controllers/EventController.js');
const authMiddleware = require('../../middlewares/AuthMiddleware')


events.get('/', authMiddleware.index,EventController.index);
events.post('/', authMiddleware.index, EventController.store);
events.delete('/:id', authMiddleware.index, EventController.delete);
events.get('/:id', authMiddleware.index, EventController.show);
events.put('/:id', authMiddleware.index, EventController.update);

module.exports = events;