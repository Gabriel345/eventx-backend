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
    unique: true,
    lowercase: true // Transforma o e-mail em minúsculas automaticamente
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

// Middleware para fazer hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  const user = this;
  // Verifique se a senha é nova ou foi modificada
  if (!user.isModified('passwordHash')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Número de saltos de hashing
    const hash = await bcrypt.hash(user.password, salt);
    user.passwordHash = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Método para verificar a senha
userSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
