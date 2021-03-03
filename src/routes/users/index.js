const users = require('express').Router();

const UserController = require('../../controllers/UserController.js');

users.get('/', UserController.index);
users.post('/singup', UserController.store);
users.post('/login', UserController.login);
users.delete('/:id', UserController.delete);


module.exports = users;