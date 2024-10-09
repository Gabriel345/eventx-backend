const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['tipo1', 'tipo2', 'tipo3'], // Tipos de eventos permitidos
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true // Adicionando índice para melhorar o desempenho
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  participants: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      status: {
        type: String,
        enum: ['confirmed', 'pending', 'declined'],
        default: 'pending'
      }
    }
  ]
});

// Método estático para encontrar eventos por organizador
eventSchema.statics.findByOrganizer = function(organizerId) {
  return this.find({ organizer: organizerId });
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
