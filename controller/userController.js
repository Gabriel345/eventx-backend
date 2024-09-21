const User = require('../models/user');
const createError = require('http-errors');
const Event = require('../models/event');
const bcrypt = require('bcrypt');

// Criação de usuário
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Gerar hash da senha
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Criar o novo usuário com o hash da senha
    const newUser = await User.create({ username, email, passwordHash });

    req.session.userId = newUser._id;
   
    // Em vez de redirecionar, retornamos os dados do usuário
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter perfil do usuário autenticado
exports.getUserProfile = async (req, res) => {
  try {
    // Verificar se o usuário está autenticado
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Encontrar o usuário pelo ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontrar eventos relacionados ao usuário
    const userEvents = await Event.find({ organizer: userId });
    const registeredEvents = await Event.find({ 'participants.user': userId });

    // Retornar o perfil do usuário e eventos associados
    res.status(200).json({
      user,
      userEvents,
      registeredEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualização de usuário
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exclusão de usuário
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
