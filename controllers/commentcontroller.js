const BlogData = require("../models/blogSchema")
const CommentData = require("../models/commentSchema")

exports.commentProcess = async (req,res)=>{
    try {
        
        const user = req.user
        
        const comments = {
            ...req.body,            
            blog: req.params.id, 
            author: user._id  
        }

        await CommentData.create(comments)
        res.redirect(`/blogDetails/${req.params.id}`)
        

    } catch (error) {
        console.log(error.message);
        
    }
}

exports.commentDelete = async (req,res)=>{

 try {

        const user = req.user
        const comment = await CommentData.findById(req.params.id)

        if(comment.author.toString() !== user._id.toString()){
            console.log("not allowed to deleted");

        }

        await CommentData.findByIdAndDelete(req.params.id)
        res.redirect(`/blogDetails/${comment.blog}`)
        
    } catch (error) {
        console.log(error.message);
        
    }

}

exports.commentEdit = async (req,res)=>{
    try {
        const comment = await CommentData.findById(req.params.id).populate('blog');
        const blogs = await BlogData.find()

        if (comment.author.toString() !== req.user._id.toString()) {
            return res.redirect('/errorPage');
        }

        const commentval = await CommentData.find({blog: comment.blog._id}).populate('author').sort({createdAt: -1});

        return res.render('pages/blogDetails', {
            commentval,         
            comment,
            blogs,         
            author: req.user,  
            blog: comment.blog,
            isEditing: true    
        });

    } catch (error) {

        console.log(error.message);
        res.redirect('/errorPage');

    }
};

exports.commentUpdates = async (req,res)=>{

    try {
        
        const comment = await CommentData.findById(req.params.id)

        if(!comment){
            return res.redirect('/errorPage')
        }

        if(comment.author.toString() !== req.user._id.toString()){
            return res.redirect('/errorPage')
        }

        comment.comments = req.body.comments
        await comment.save()
        res.redirect(`/blogDetails/${comment.blog}`)

    } catch (error) {
        
    }

}


// --------------- blog like process ----------------- //

exports.likeBlog = async (req, res) => {
  try {
    const blog = await BlogData.findById(req.params.id);

    blog.dislikes = blog.dislikes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    if (blog.likes.includes(req.user._id)) {

      blog.likes = blog.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );

    } else {
      blog.likes.push(req.user._id);

    }

    await blog.save();
    res.redirect(`/blogDetails/${req.params.id}`);

  } catch (error) {
    console.log(error.message);
    
  }
};

// ------------- blog dislike process -------------- //

exports.dislikeBlog = async (req, res) => {
  try {
    const blog = await BlogData.findById(req.params.id);

    blog.likes = blog.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    if (blog.dislikes.includes(req.user._id)) {
      blog.dislikes = blog.dislikes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      blog.dislikes.push(req.user._id);
    }

    await blog.save();
    res.redirect(`/blogDetails/${req.params.id}`);

  } catch (error) {
    console.log(error.message);

  }
};
