const jwt = require('jsonwebtoken')
const isUserLogedIn = (req, res, next) => {
    const cookies = req.cookies

    if (req.route.path === '/') {
        if (cookies.token) {
            const token = cookies.token
            let id, name;
            if (token) {
                const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                name = user && user.username;
                id = user && user._id;
                profileurl = user && user.profileurl
                req.user = {
                    name: name,
                    id: id,
                    profileurl: profileurl,
                }
            }
        }

        return next()
    }

    if (cookies.token) {
        const token = cookies.token
        let id, name;
        if (token) {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            name = user && user.username;
            id = user && user._id;
            profileurl = user && user.profileurl
            req.user = {
                name: name,
                id: id,
                profileurl: profileurl,
            }
        }
        next();
    }
    else {
        res.redirect('/login')
    }
}

module.exports = isUserLogedIn