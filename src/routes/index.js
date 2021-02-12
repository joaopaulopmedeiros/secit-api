const { Router } = require('express');
const EventController = require('../controllers/EventController');

const routes = Router();

routes.get('/eventos', EventController.index);

module.exports = routes;