const USER = require('../models/user.model.js');
const bcrypt = require("bcrypt")
const createUser = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Missing fields" })
    }
    const user = await USER.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    const token = user.generateAccessToken()
    res.cookie('token', token)
    res.redirect('/')
}

const loginUser = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: "Missing fields" })
    }

    const user = await USER.findOne({ 'username': req.body.username })
    if (!user) {
        return res.status(401).send({ auth: false, message: `username ${req.body.username} not found` })
    }
    if (user.checkPassword(req.body.password)) {
        const token = user.generateAccessToken()
        res.cookie('token', token)
        res.redirect('/')
    } else {
        return res.status(401).send({ auth: false, message: 'Wrong password.' })
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
}

module.exports = { createUser, loginUser, logoutUser }