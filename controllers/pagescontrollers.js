const BlogData = require("../models/blogSchema")
const CommentData = require("../models/commentSchema")
const UserData = require("../models/userSchema")

// ----- HOME PAGE ----- //

exports.homepage = async (req,res)=>{

    const blogs = await BlogData.find().sort({ createdAt: -1 }).populate('author')
    return res.render('index', {blogs})

} 

// ----- ADD BLOG PAGE ----- //

exports.addBlog = async (req,res)=>{
    return res.render('pages/addBlog' , {blog: null})
}

// -------- ALL BLOGS PAGES ------- //

exports.allBlogs = async (req,res)=>{

    const{category} = req.query
    let query = {}
    if(category){
        query.category = category
    }
    
    const blogs = await BlogData.find(query).sort({ createdAt: -1 }).populate('author')
    return res.render('pages/allBlogs' , {blogs, selectedCategory: category || null })

}

// -------- CHANGE PASSWORD PAGE ------ //

exports.changePass = (req,res)=>{
    return res.render('pages/changePass')
}

// ----- MY BLOG PAGE ----- //

exports.myBlogsPage = async (req,res)=>{

    const user = req.user
    const blogs = await BlogData.find({author: user._id}).populate('author')
    return res.render('pages/myBlogs', {blogs})

}

// ----- BLOG DETAILS PAGE ----- //

exports.blogDetails = async (req,res)=>{

    const blog = await BlogData.findById(req.params.id).populate('author') 
    const blogs = await BlogData.find()
    const commentval = await CommentData.find({blog:blog.id}).populate('author').sort({createdAt: -1})
    res.render('pages/blogDetails', {blogs, blog, commentval , author: req.user || null, isEditing: false})

}

// ----- ERROR 404 NOT FOUND PAGE ----- //

exports.errorPage = (req,res)=>{
    return res.render('pages/errorPage')
}

// ----- PROFILE PAGE ----- //

exports.profilePage = async (req,res)=>{

    const blogs = await BlogData.find({author: req.user._id})
    const uniqueCategories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
    return res.render('pages/about', {blogs,uniqueCategories})

}

// ----------- EDIT PROFILE ----------- //

exports.editProfile = async (req,res)=>{

    const user = await UserData.findById(req.user._id)
    return res.render('pages/editProfile', {user})

}

exports.categoryPage = (req,res)=>{
    return res.render('pages/category')
}