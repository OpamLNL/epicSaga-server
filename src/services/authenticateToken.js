const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        // Перевірка ролі користувача
        if (user.role === 'admin' || user.role === 'editor') {
            req.user = user;
            next();
        } else {
            return res.sendStatus(403);
        }
    });
}

module.exports = authenticateToken;
