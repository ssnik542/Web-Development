const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buser"
    }
}, { timestamps: true })

const COMMENT = mongoose.model('comment', commentSchema)

module.exports = COMMENT;