var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

// Rotas para gerenciamento de usuários usando a API

// Rota para criar um usuário (registro)
router.post('/register', userController.createUser);

// Rota para obter todos os usuários
router.get('/', userController.getAllUsers);

// Rota para obter o perfil do usuário autenticado
router.get('/profile', userController.getUserProfile);

// Rota para atualizar um usuário
router.put('/:id', userController.updateUser);

// Rota para deletar um usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
