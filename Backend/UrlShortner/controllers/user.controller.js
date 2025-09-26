const jwt = require('jsonwebtoken')
const USER = require('../models/user.model.js');

const createUser = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Missing fields" })
    }
    const user = await USER.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const token = jwt.sign({ ...user },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    res.cookie('token', token)
    res.redirect('/')
}

const loginUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Missing fields" })
    }

    const user = await USER.findOne({ 'email': req.body.email })
    if (!user) {
        return res.status(401).send({ auth: false, message: `Email ${req.body.email} not found` })
    }
    const token = jwt.sign({ ...user },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    res.cookie('token', token)
    res.redirect('/')
}

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
}

module.exports = { createUser, loginUser, logoutUser }