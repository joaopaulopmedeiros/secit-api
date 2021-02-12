const events = require('express').Router();

const EventController = require('../controllers/Events/EventController.js');

events.get('/', EventController.index);

module.exports = events;