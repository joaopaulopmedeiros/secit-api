const events = require('express').Router();

const EventController = require('../../controllers/EventController.js');

events.get('/', EventController.index);
events.post('/', EventController.store);
events.delete('/:id', EventController.delete);
events.get('/:id', EventController.show);
events.put('/:id', EventController.update);

module.exports = events;