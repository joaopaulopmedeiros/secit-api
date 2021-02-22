const events = require('express').Router();

const EventController = require('../../controllers/EventController.js');

events.get('/', EventController.index);
events.post('/', EventController.store);
events.get('/:id', EventController.show);

module.exports = events;