const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
    },
    content:  {
        type: String,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
