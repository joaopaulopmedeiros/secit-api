const events = require('express').Router();

const EventController = require('../controllers/Events/EventController.js');

events.get('/', EventController.index);
events.post('/', EventController.store);

module.exports = events;