const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares para parsear datos y cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Rutas
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

app.use('/', authRoutes);
app.use('/posts', postsRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto ' + PORT);
});
