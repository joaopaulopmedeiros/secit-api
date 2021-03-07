const users = require('express').Router();

const UserController = require('../../controllers/UserController.js');
const AuthMiddleware = require('../../services/AuthMiddleware')

//guest
users.post('/signup', UserController.store);
users.post('/login', UserController.login);

//authenticated
users.get('/', AuthMiddleware.index, UserController.index);
users.delete('/:id', AuthMiddleware.index, UserController.delete);
users.get('/me', AuthMiddleware.index, UserController.aboutme)


module.exports = users;