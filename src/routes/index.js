const { Router } = require('express');
const routes = Router();
const events = require('./events/index');
const users = require('./users/index');

routes.use('/eventos', events);
routes.use('/users', users);

module.exports = routes;