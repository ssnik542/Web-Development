const nanoid = require('nanoid')
const URL = require('../models/url.model.js')
const jwt = require('jsonwebtoken')

async function handleGenerateURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortId = nanoid(Number(body.length));

    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login')
    }
    let id;
    if (token) {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        id = user._doc._id;
    }
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: id
    })
    res.redirect('/')
}

async function handleGetAllURL(req, res) {
    let urls = await URL.find()
    return res.json({ urls })
}

module.exports = { handleGenerateURL, handleGetAllURL }