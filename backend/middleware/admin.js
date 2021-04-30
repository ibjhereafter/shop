const admin = function (req, res, next) {
    if (req.user && req.user.isAdmin) {
        return next();
    } else {
        const error = new Error('Only admins can access this resource!');
        return res.status(403).json({ error: error.message });
    }
};

module.exports = admin;