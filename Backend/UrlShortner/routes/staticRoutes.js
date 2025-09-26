const express = require('express');
const URL = require('../models/url.model');
const jwt = require('jsonwebtoken')
const staticRouter = express.Router();

staticRouter.get('/', async (req, res) => {
    const token = req.cookies.token
    let id, name;
    if (token) {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        name = user._doc.name;
        id = user._doc._id;
    }
    let urls = await URL.find({ createdBy: id })
    return res.render('home', {
        urls, name, urlLength: urls.length
    })
})

staticRouter.get('/login', async (req, res) => {
    return res.render('login')
})
staticRouter.get('/signup', async (req, res) => {
    return res.render('signup')
})


module.exports = staticRouter