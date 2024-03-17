const mongoose = require('mongoose')
const PostSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
       user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Posts = mongoose.model("Posts" , PostSchema)

module.exports = Posts