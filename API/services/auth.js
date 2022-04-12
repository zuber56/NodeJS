const jwt = require('jsonwebtoken');
const { comparePasswords } = require('../shared/utils');
// const AuthTheme = require('../models/AuthTheme');

module.exports = {
    login: async function (user, password) {
        const areEqual = await comparePasswords(user.password, password);
        if (!areEqual) {
            return res.status(403).send({
                success: false,
                message: 'Password is not correct!'
            });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: 36000 //expires in 24 hours
        });
        const payload = {
            access_token: token,
            expires_in: 36000,
            refresh_token: "",
            token_type: "Bearer"
        };
        return payload;
    },
}