const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if(!access_token) {
            throw {
                status: 401,
                message: "Unauthorized Access!"
            }
        } else {
            const decoded = verifyToken(access_token);
            console.log(decoded, "<<<<<<<<authentication");
            req.loggedInUser = decoded;
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (user) {
                console.log(user.email, "<<<<<<<<authentication2");
                next();
            } else {
                throw {
                    status: 401,
                    message: "Unauthorized Access!"
                }
            }
        }
    } catch (err) {
        next(err);
    }
}