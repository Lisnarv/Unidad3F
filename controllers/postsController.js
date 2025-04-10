const pool = require('../config/db');

exports.getPosts = (req, res) => {
    const sql = 'SELECT * FROM posts';
    pool.query(sql, (err, results) => {
       if (err) {
           return res.status(500).send('Error al obtener posts.');
       }
       res.render('posts', { posts: results, user: req.user });
    });
};

exports.createPost = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }
    const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    pool.query(sql, [title, content], (err, results) => {
       if (err) {
           return res.status(500).send('Error al crear el post.');
       }
       res.redirect('/posts');
    });
};

exports.updatePost = (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;
    if (!title || !content) {
        return res.status(400).send('Todos los campos son obligatorios para actualizar.');
    }
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    pool.query(sql, [title, content, postId], (err, results) => {
       if (err) {
           return res.status(500).send('Error al actualizar el post.');
       }
       res.redirect('/posts');
    });
};

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    const sql = 'DELETE FROM posts WHERE id = ?';
    pool.query(sql, [postId], (err, results) => {
       if (err) {
           return res.status(500).send('Error al eliminar el post.');
       }
       res.redirect('/posts');
    });
};
