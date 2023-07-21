const express = require('express');
const router = express.Router();

// Load model
const Post = require('../models/Post');
// Hien thi tat ca cac posts
router.get('/', async (req, res) => {
    const posts = await Post.find().lean().sort({ date: -1 });
    res.render('posts/index', { posts });
});
// Hien thi form tao bai viet moi
router.get('/add', (req, res) => {
    res.render('posts/add');
})
// Create a new post
router.post('/', async (req, res) => {
    const { title, text } = req.body;
    let errors = [];
    if (!title) errors.push('title must be provided');
    if (!text) errors.push('text must be provided');
    if (errors.length > 0) res.render('posts/add', { title: title, errors: errors });
    else {
        const newPostData = { title, text };
        const newPost = new Post(newPostData);
        await newPost.save();
        res.redirect('/posts');
    }
});
// Hien thi form thay doi bai viet
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean();
    res.render('posts/edit', { post });
})
// Cap nhap thay doi bai viet
router.put('/:id', async (req, res) => {
    const { title, text } = req.body;
    await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
    res.redirect('/posts');
})
// Delete post
router.delete('/:id', async (req, res) => {
    await Post.findOneAndRemove({ _id: req.params.id });
    res.redirect('/posts');
});
module.exports = router;