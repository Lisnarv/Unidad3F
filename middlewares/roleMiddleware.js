exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).send('Acceso denegado. Esta operación es exclusiva para usuarios Admin.');
    }
    next();
};
