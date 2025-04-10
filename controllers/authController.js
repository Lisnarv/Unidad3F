const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware auxiliar para verificar el token (también con middleware de authMiddleware)
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).send('Token inválido o expirado.');
    }
};

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }
    try {
        // Cifrado de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insertar usuario en la base de datos
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        pool.query(sql, [name, email, hashedPassword, role], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error en el registro.');
            }
            res.redirect('/login');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno.');
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email y contraseña son obligatorios.');
    }
    const sql = 'SELECT * FROM users WHERE email = ?';
    pool.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al consultar el usuario.');
        }
        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado.');
        }
        const user = results[0];
        // Comparar contraseña
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Contraseña incorrecta.');
        }
        // Generar JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Enviar token en cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    });
};

exports.dashboard = (req, res) => {
    // Se accede aquí solo si el token es válido y se ha obtenido la información del usuario
    res.render('dashboard', { user: req.user });
};
