const users = require('express').Router();

const UserController = require('../../controllers/UserController.js');
const authMiddleware = require('../../services/AuthMiddleware')

//guest
users.post('/singup', UserController.store);
users.post('/login', UserController.login);

//authenticated
users.get('/', authMiddleware.index, UserController.index);
users.delete('/:id', authMiddleware.index, UserController.delete);
users.get('/me',authMiddleware.index, UserController.aboutme)


module.exports = users;