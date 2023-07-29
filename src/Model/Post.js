import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    fotoPost: {
        type: Buffer,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    likes: {
        type: Array,
        require: true,
    },
    comments: {
        type: Array,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Post = mongoose.model('Post', postSchema);

export default Post


