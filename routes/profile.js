const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// Middleware para verificar autenticação
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next(); // Usuário autenticado, prossegue para a próxima rota
  }
  // Se não estiver autenticado, redireciona para a página de login
  res.redirect('/login?message=login_required');
};

// Rota para exibir o perfil do usuário
router.get('/', isAuthenticated, UserController.getUserProfile);

module.exports = router;
