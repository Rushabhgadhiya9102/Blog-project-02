const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    comments: {
        type:String,
    },

    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogData'
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData'
    }

},{
    timestamps: true
})

const CommentData = mongoose.model('CommentData', commentSchema)
module.exports = CommentData