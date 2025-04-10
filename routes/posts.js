const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

// Obtener todos los posts (accesible para Admin y Editor)
router.get('/', postsController.getPosts);

// Crear, actualizar y eliminar posts (solo Admin)
router.post('/', isAdmin, postsController.createPost);
router.put('/:id', isAdmin, postsController.updatePost);
router.delete('/:id', isAdmin, postsController.deletePost);

module.exports = router;
