const router = require('express').Router();
const jwt = require('../middleware/jwt');
const { login, registrar, getUsuarios } = require('../controllers/indexController');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', login);

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', registrar);

router.get('/datos', jwt.auth, getUsuarios)

module.exports = router