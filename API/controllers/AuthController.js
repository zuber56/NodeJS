const {
    ValidateEmail,
} = require('../services/user');
const AuthService = require('../services/auth');

module.exports = {
    login: async function (req, res) {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await ValidateEmail(email);
            if (!user) {
                return res.status(403).send({
                    success: false,
                    message: 'Email does not exist!'
                });
            }
            const { status, role } = user;
            const token = await AuthService.login(user, password)
            // console.log(status, role)
            if (role === 'admin' || role === 'agency') {
                return res.status(200).send({
                    success: true,
                    data: {
                        user,
                        token
                    }
                });
            } else {
                if (status === 'active' || status === 'paused') {
                    return res.status(200).send({
                        success: true,
                        data: {
                            user,
                            token
                        }
                    });
                } else if (status === 'closed' || status === null || status === undefined) {
                    return res.status(400).send({
                        success: false,
                        message: 'The account was closed. Contact with an admin'
                    });
                }
            }
        } catch (error) {
            console.log('login : ', error);
            res.status(500).send({
                success: false,
                message: error
            });
        }
    },
}