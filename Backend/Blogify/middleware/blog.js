const jwt = require('jsonwebtoken')

const getUser = (req, res, next) => {
    const cookies = req.cookies
    const token = cookies.token
    let id, name;
    if (token) {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        name = user && user.username;
        id = user && user._id;
        req.user = {
            name: name,
            id: id
        }
    }
    next();
}

module.exports = getUser;