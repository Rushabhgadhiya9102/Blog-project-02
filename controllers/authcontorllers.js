const BlogData = require("../models/blogSchema")
const CommentData = require("../models/commentSchema")
const UserData = require("../models/userSchema")
const bcrypt = require('bcrypt')

exports.loginPage = (req,res)=>{
    return res.render('pages/login')
} 

exports.signUpPage = (req,res)=>{
    return res.render('pages/signup')
}

exports.signUpProcess = async (req,res)=>{
    try {
        
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await UserData.create(req.body)
        console.log("User Created Successfully", req.body);
        return res.redirect('/login')

    } catch (error) {
        console.log(error.message);
        

    }
}

exports.updateProfile = async (req,res) =>{

    try{

        const {userName, bio, email} = req.body
        const user = await UserData.findById(req.user._id)

        if(!user){
            return res.redirect('/errorPage')
        }

        user.userName = userName || user.userName
        user.bio = bio || user.bio
        user.email = email || user.email

        if(req.files?.profileImage){
            user.profileImage = req.files.profileImage[0].path
        }

        if(req.files?.coverImage){
            user.coverImage = req.files.coverImage[0].path
        }

        await user.save()
        res.redirect('/about')

    }catch(error){
        console.log(error.message);
        return res.redirect('/errorPage')
        
    }

}


exports.changePassProcess = async (req,res)=>{

    const {id} = req.params
    const {oldPassword, newPassword, confirmPassword} = req.body
    const user = await UserData.findById(id)
    const isValid = await bcrypt.compare(oldPassword, user.password)

    if(isValid){
        if(newPassword === confirmPassword ){

            user.password = await bcrypt.hash(newPassword, 10)
            await user.save()
            return res.redirect('/logout')

        }else{
            console.log("new password and confirm password not match");
            return res.redirect('/changePass')
            
        }
    }else{
        console.log("old password id not match");
        return res.redirect('/changePass')
    }

}

exports.deleteAccount = async (req, res, next) => {

    try {
    
      const userId = req.user._id;
      
      await CommentData.deleteMany({ author: userId });
    
      await BlogData.updateMany(
        
        { $or: [{ likes: userId }, { dislikes: userId }] },
        { $pull: { likes: userId, dislikes: userId } }
        
      );
    
      await BlogData.deleteMany({ author: userId });
    
      await UserData.findByIdAndDelete(userId);
    
      req.logout(err => {
          
        if (err) return next(err);
        res.redirect('/logout');
        
      });
    
    } catch (error) {
    
      console.log(error.message);
      res.redirect('/errorPage');
    
    }
};
