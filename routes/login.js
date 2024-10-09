var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');

/* GET página de login. */
router.get('/', function(req, res, next) {
  // Verifica se o usuário já está autenticado
  if (req.session.userId) {
    return res.redirect('/'); // Redireciona para a página inicial se já estiver logado
  }
  res.render('login', { message: req.query.message }); // Passa mensagem se houver
});

/* Logout do usuário */
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer logout' });
    }
    res.redirect('/login?message=logout'); // Redireciona com mensagem de logout
  });
});

/* Login do usuário */
router.post('/', authController.login);

module.exports = router;
