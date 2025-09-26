const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'buser' },
    description: { type: String, required: true },
    blogImg: { type: String }
}, { timestamps: true })


const BLOG = mongoose.model('blog', blogSchema)

module.exports = BLOG;