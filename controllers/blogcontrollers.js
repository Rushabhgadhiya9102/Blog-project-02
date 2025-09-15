const BlogData = require("../models/blogSchema")

// =================== BLOG CRUD OPERATIONS ================= //

// ----- CREATE BLOG  ----- //

exports.addBlogProcess = async(req,res)=>{
    try {
        
        const user = req.user

        if(!user){
            return res.redirect('/login')
        }

        const blog = {
            ...req.body,
            blogImage: req.file ? req.file.path : null,
            author : user._id
        }

        await BlogData.create(blog)
        console.log("blog is created successfully");
        console.log(blog);
        
        res.redirect('/myBlogs')
        

    } catch (error) {
        
    }
}

// ----- DELETE BLOG ----- //

exports.deleteBlogProcess = async(req,res)=>{

    try {

        const user = req.user
        const blog = await BlogData.findById(req.params.id)

        if(blog.author.toString() !== user._id.toString()){
            console.log("not allowed to deleted");

        }

        await BlogData.findByIdAndDelete(req.params.id)
        res.redirect('/myBlogs')
        
    } catch (error) {
        console.log(error.message);
        
    }

}

// ----- EDIT BLOG  ----- //

exports.editBlogProcess = async (req,res)=>{

    const blog = await BlogData.findById(req.params.id)
    return res.render('pages/addBlog', {blog})

}

// ----- UPDATE BLOG ----- //

exports.updateBlogProcess = async(req,res)=>{

    try {
        
        const user = req.user
        const blog = await BlogData.findById(req.params.id)

        if(!blog) {
            return res.redirect('/errorPage')
        }

        if(blog.author.toString() !== user._id.toString()){
            return alert('Not Allowed to Update the blog')
        }

        blog.title = req.body.title 
        blog.category = req.body.category 
        blog.blogContent = req.body.blogContent
        
        if(req.file){
            blog.blogImage = req.file.path
        }

        await blog.save()
        res.redirect('/myBlogs')


    } catch (error) {
        console.log(error.message);
        return res.redirect('/errorPage')

    }

}

// =================== BLOG CRUD OPERATIONS ================= //