const User = require('../models/user');
const bcrypt = require('bcrypt');

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

        req.session.userId = user._id; // Armazena o ID do usuário na sessão
        res.status(200).json({ message: 'Login realizado com sucesso', userId: user._id }); // Resposta JSON
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
    }
};
