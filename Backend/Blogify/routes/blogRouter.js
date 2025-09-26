const express = require('express');
const path = require('path');
const { createBlog, deleteBlog, createComment } = require('../controllers/blog.controller');
const blogRouter = express.Router();
const multer = require('multer');
const getUser = require('../middleware/blog');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


blogRouter.post('/', upload.single('blogImage'), createBlog)

blogRouter.get('/:id', deleteBlog)

blogRouter.post('/comment/:blogid', createComment)
module.exports = blogRouter