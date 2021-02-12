const { Router } = require('express');
const routes = Router();
const events = require('./events');

routes.use('/eventos', events);

module.exports = routes;