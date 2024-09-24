const Event = require('../models/event');
const path = require('path');

// Criação de evento
exports.createEvent = async (req, res) => {
  try {
    const { title, type, description, date } = req.body;

    // Verificar se a imagem de capa foi enviada
    if (!req.file) {
      return res.status(400).json({ message: 'Imagem de capa não enviada' });
    }

    const coverImagePath = path.relative(path.join(__dirname, '..', 'public', 'uploads'), req.file.path);
    
    const newEvent = new Event({
      title,
      type,
      description,
      date,
      coverImage: coverImagePath
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter todos os eventos
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter evento por ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar evento
exports.updateEvent = async (req, res) => {
  try {
    const { title, type, description, date } = req.body;
    const updatedData = { title, type, description, date };

    // Verificar se há um novo arquivo de imagem
    if (req.file) {
      const coverImagePath = path.relative(path.join(__dirname, '..', 'public', 'uploads'), req.file.path);
      updatedData.coverImage = coverImagePath;
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Excluir evento
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Registrar para evento
exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    event.participants.push({ user: req.body.userId }); // Adicione aqui o ID do usuário do corpo da requisição
    await event.save();

    res.status(200).json({ message: 'Registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancelar registro de evento
exports.unregisterFromEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    event.participants = event.participants.filter(participant => participant.user !== req.body.userId); // Adicione aqui o ID do usuário do corpo da requisição
    await event.save();

    res.status(200).json({ message: 'Registro cancelado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
