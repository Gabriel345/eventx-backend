var express = require('express');
var router = express.Router();
var userController = require("../controller/userController");
var User = require('../models/user'); // Supondo que você tenha um modelo de usuário

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find(); // Buscando todos os usuários
    res.json(users); // Retorna a lista de usuários em formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register'); // Renderiza a página de registro
});

/* POST register a new user. */
router.post('/register', userController.createUser);

module.exports = router;
