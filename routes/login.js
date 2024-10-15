var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');

// Rota de logout
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer logout' });
    }
    res.status(200).json({ message: 'Logout realizado com sucesso' }); // Resposta JSON
  });
});

// Rota de login
router.post('/login', authController.login); // Mantém como POST para autenticação

module.exports = router;
