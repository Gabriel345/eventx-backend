const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Rotas de usuários
router.post('/register', userController.createUser); // Rota para criar um novo usuário
router.post('/login', userController.login); // rota de login 

router.get('/', userController.getAllUsers); // Rota para buscar todos os usuários
router.get('/:id', userController.getUserProfile); // Rota para buscar o perfil de um usuário pelo ID
router.put('/:id', userController.updateUser); // Rota para atualizar um usuário pelo ID
router.delete('/:id', userController.deleteUser); // Rota para deletar um usuário pelo ID

module.exports = router;
