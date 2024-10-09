var express = require('express');
var router = express.Router();

// Middleware para verificar se o usuário já está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    // Redireciona para a página inicial ou perfil se o usuário já estiver autenticado
    return res.redirect('/'); // Mude para '/profile' se preferir
  }
  next(); // Usuário não autenticado, prossegue para a próxima rota
};

// Rota para renderizar a view de cadastro de usuário
router.get('/register', isAuthenticated, function(req, res, next) {
  const errorMessage = req.query.message || ''; // Obtenha a mensagem de erro, se existir
  res.render('register', { errorMessage }); // Passe a mensagem de erro para a view
});

module.exports = router;
