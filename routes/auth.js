const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', authController.register);

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    res.clearCookie('token');  
    res.render('logout', { message: 'Has cerrado la sesión correctamente.' });
  });

// Ruta protegida: dashboard
router.get('/dashboard', authController.verifyToken, authController.dashboard);

module.exports = router;
