var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

// Middleware para verificar se o usuário está autenticado
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }
  next(); // Usuário autenticado, prossegue para a próxima rota
};

// Rotas para gerenciamento de usuários usando a API

// Rota para criar um usuário (registro)
router.post('/register', userController.createUser);

// Rota para obter todos os usuários (requer autenticação)
router.get('/', isAuthenticated, userController.getAllUsers);

// Rota para obter o perfil do usuário autenticado (requer autenticação)
router.get('/profile', isAuthenticated, userController.getUserProfile);

// Rota para atualizar um usuário (requer autenticação)
router.put('/:id', isAuthenticated, userController.updateUser);

// Rota para deletar um usuário (requer autenticação)
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
