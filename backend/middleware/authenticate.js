const jwt = require('jsonwebtoken');
const User = require('../database/usersModel');

const authenticate = async function (req, res, next) {
    try {
        const { jwtCookie } = req.cookies;
        if (!jwtCookie) {
            const error = new Error('Please, sign in!');
            return res.status(401).json({ error: error.message });
        }
        const validCookie = await jwt.verify(jwtCookie, process.env.JWT_SECRET);

        if (!validCookie) {
            const error = new Error('Please, sign in!');
            return res.status(401).json({ error: error.message });
        }
        const { _id } = validCookie;
        req.user = await User.findOne({_id, token: jwtCookie});
        req.token = jwtCookie;

        return next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

module.exports = authenticate;