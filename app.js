var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require("./config");
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const cors = require('cors'); // Importar o cors

// Importar rotas
var usersRouter = require('./routes/users');
var eventRouter = require('./routes/events');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');

// Conectar ao banco de dados
connectDB();
var app = express();

// Middleware
app.use(cors()); // Adicionar middleware CORS
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);

// Rotas da API
app.use('/api/events', eventRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/profile', profileRouter);

// Rota para verificar se o servidor está funcionando
app.get('/api', (req, res) => {
    res.json({ message: 'API está funcionando!' });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({ 
        error: {
            message: err.message,
            status: err.status || 500,
        } 
    });
});

module.exports = app;
