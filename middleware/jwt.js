const jwt = require('jsonwebtoken');

const generateToken = (username) => {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return token;
}

const auth = function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = { auth, generateToken }