require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const http = require('http');
const handleRequest = require('./routes/endpointRouter');
const path = require("path");
const morgan = require("morgan");
const { closePool } = require("./config/database");

// Middleware для обробки CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// path to public images
const relativeImagesPath = path.resolve(__dirname, "..", "public", "images");
app.use('/images', express.static(relativeImagesPath));

// Використання middleware morgan для виводу логів
app.use(morgan('combined'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware для парсингу JSON тіл
app.use(express.json());

// Підключення ендпойнтроутера
app.use(handleRequest);

const PORT = process.env.PORT;
const ipAddress = process.env.DB_IP;

// Запуск сервера
const server = http.createServer(app);

server.listen(PORT, ipAddress, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Обробка закриття сервера
process.on('SIGINT', async () => {
    try {
        await closePool();
        console.log('Відключено від БД');
        server.close(() => {
            console.log('Сервер зупинено.');
            process.exit(0);
        });
    } catch (error) {
        console.error('Помилка при відключення від бд', error);
        process.exit(1);
    }
});
