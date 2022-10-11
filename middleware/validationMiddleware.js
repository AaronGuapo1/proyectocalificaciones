const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.title == null){
    return res.redirect('/posts/new')
    }
    next()
    }