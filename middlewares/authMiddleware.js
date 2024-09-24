// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtendo o token do header

    if (!token) return res.sendStatus(401); // Se não houver token, retorna 401

    jwt.verify(token, 'sua_chave_secreta_aqui', (err, user) => {
        if (err) return res.sendStatus(403); // Se o token não for válido, retorna 403
        req.user = user; // Armazena as informações do usuário na requisição
        next(); // Chama o próximo middleware ou rota
    });
}

module.exports = authenticateToken;
