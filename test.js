const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/nosirve', {useNewUrlParser: true});
BlogPost.create({
title: 'porque',
body: 'aqui si funciona'
}, (error, blogpost) =>{
console.log(error,blogpost)
})