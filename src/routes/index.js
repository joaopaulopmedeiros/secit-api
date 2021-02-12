const { Router } = require('express');
const EventController = require('../controllers/Events/EventController.js');

const routes = Router();

routes.get('/eventos', EventController.index);

module.exports = routes;