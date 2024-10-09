const User = require('../models/user');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const { check, validationResult } = require('express-validator');

exports.validateLogin = [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').not().isEmpty().withMessage('Senha é obrigatória'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao fazer logout' });
      }
      res.clearCookie('connect.sid'); // Limpa o cookie da sessão
      res.status(200).json({ message: 'Logout realizado com sucesso' });
    });
  };