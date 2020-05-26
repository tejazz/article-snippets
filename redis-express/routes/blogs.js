const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');
const cleanCache = require('../middleware/cleanCache');

blogsRouter.route('/:user')
    .get(async (req, res, next) => {
        const blogs = await Blog
                            .find({ user: req.params.user })
                            .cache({ key: req.params.user });

        res.status(200).json({
            blogs,
        });
    });

blogsRouter.route('/')
    .post(cleanCache, async (req, res, next) => {
        const existingBlog = await Blog.findOne({ title: req.body.title });

        if (!existingBlog) {
            let newBlog = new Blog(req.body);

            const result = await newBlog.save();

            return res.status(200).json({
                message: `Blog ${result.id} is successfully created`,
                result,
            });
        }

        res.status(200).json({
            message: 'Blog with same title exists',
        });
    });

module.exports = blogsRouter;
