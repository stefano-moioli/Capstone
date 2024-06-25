const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Token non fornito' });
    }
    
    token = token.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ message: 'Token non valido' });
        } else {
            req.user = data; // Salva i dati del token nel req.user
            next();
        }
    });
};


module.exports = authMiddleware