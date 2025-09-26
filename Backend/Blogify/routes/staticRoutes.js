const express = require('express');
const isUserLogedIn = require('../middleware/users');
const staticRouter = express.Router();
const BLOG = require('../models/blog.model.js');
const USER = require('../models/user.model.js');
const COMMENT = require('../models/comment.model.js');
const getUser = require('../middleware/blog.js');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

staticRouter.get('/', isUserLogedIn, async (req, res) => {
    const blogs = await BLOG.find();
    const user = req.user;
    res.render("home", {
        title: 'home',
        user,
        blogs
    })
})

staticRouter.get('/add-blog', isUserLogedIn, (req, res) => {
    const user = req.user;
    res.render("addblogs", {
        title: 'add-blogs',
        user
    })
})

staticRouter.get('/profile', isUserLogedIn, async (req, res) => {
    const user = req.user;
    const blogs = await BLOG.find({ 'author': user.id })
    res.render("profile", {
        title: 'profile',
        user,
        blogs,

    })
})

staticRouter.get('/login', (req, res) => {
    res.render("login", {
        title: ''
    })
})

staticRouter.get('/signup', (req, res) => {
    res.render("signin", {
        title: ''
    })
})

staticRouter.get('/blog/:id', getUser, async (req, res) => {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const user = req.user;
    const id = req.params.id
    const blog = await BLOG.findById(id).populate("author");
    const comments = await COMMENT.find({ blogId: id }).populate("createdby")
    const timesAgo = comments.map(comment => timeAgo.format(new Date(comment.createdAt))).reverse()
    res.render("blog", {
        title: '',
        user,
        blog,
        comments,
        timesAgo: timesAgo

    })
})

module.exports = staticRouter