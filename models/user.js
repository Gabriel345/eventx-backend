const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  attendanceRecords: [{
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    attended: {
      type: Boolean,
      default: false
    },
    certificateReceived: {
      type: Boolean,
      default: false
    }
  }]
});

// Adicionando um campo 'password' temporário
userSchema.virtual('password').set(function(password) {
  this._password = password; // Armazena a senha temporariamente
});

// Middleware para fazer hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  const user = this;

  // Verifica se a senha foi modificada
  if (!user.isModified('_password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Número de saltos de hashing
    const hash = await bcrypt.hash(user._password, salt); // Usando a senha temporária
    user.passwordHash = hash; // Atualiza o passwordHash com o hash gerado
    user._password = undefined; // Remove a senha temporária
    return next();
  } catch (error) {
    return next(error);
  }
});

// Método para comparar a senha fornecida com a hash armazenada
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
