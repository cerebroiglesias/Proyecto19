const jwt = require('../middleware/jwt');
const cookie = require('cookie');

let usuarios = [];

const login = (req, res) => {

    const { username, password } = req.body;

    let usuario = usuarios.find(u => u.username === username && u.password === password);

    if (!usuario) {
        res.status(401).json({ error: 'Credenciales incorrectas' });
        return;
    } else {
        const token = jwt.generateToken({ username });
        res.setHeader('Set-Cookie', cookie.serialize('token', token, { maxAge: 6000, path: '/' }));
        res.status(200).json({ username: usuario.username });
    }

}

const registrar = (req, res) => {

    const { username, password } = req.body;

    let usuario = usuarios.find(u => u.username === username);

    if (usuario) {
        res.status(409).json({ error: 'El usuario ya existe' });
        return;
    } else {
        usuarios.push({ username, password });

        // Crear un token para el usuario
        const token = jwt.generateToken({ username });
        
        res.setHeader('Set-Cookie', cookie.serialize('token', token, { maxAge: 6000, path: '/' }));
        res.status(201).json({ message: 'Usuario registrado' });
    }
}

const getUsuarios = (req, res) => {
    res.send(usuarios);
}

module.exports = {
    login,
    registrar,
    getUsuarios
}