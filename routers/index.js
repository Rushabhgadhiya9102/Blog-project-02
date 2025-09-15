const Router = require('express')
const {loginPage, signUpPage, signUpProcess, updateProfile, changePassProcess, deleteAccount } = require('../controllers/authcontorllers')
const passport = require('../middleware/passport')
const {addBlogProcess, deleteBlogProcess, editBlogProcess, updateBlogProcess } = require('../controllers/blogcontrollers')
const {imageUpload, profileUploads} = require('../middleware/imageUploads')
const { commentProcess, commentDelete, commentEdit, commentUpdates, likeBlog, dislikeBlog } = require('../controllers/commentcontroller')
const { errorPage, myBlogsPage, blogDetails, addBlog, profilePage, homepage, editProfile, allBlogs, changePass, categoryPage } = require('../controllers/pagescontrollers')
const router = Router()

router.get('/login',loginPage)
router.get('/signup',signUpPage)

router.post('/signup',signUpProcess)
router.post('/login',passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect:'/login'
}))
router.get('/changePass',passport.userAuth, changePass)
router.post('/changePass/:id', changePassProcess)
router.get('/logout', passport.logout)
router.get('/deleteAccount',passport.userAuth, deleteAccount)

router.get('/errorPage', errorPage)
router.get('/', passport.userAuth, homepage)
router.get('/addBlog',passport.userAuth, addBlog)
router.post('/addBlog',imageUpload, addBlogProcess)

router.get('/myBlogs',passport.userAuth, myBlogsPage)
router.get('/allBlogs',passport.userAuth, allBlogs)
router.get('/blogDetails/:id',passport.userAuth, blogDetails)
router.get('/delete/:id', deleteBlogProcess)
router.get('/edit/:id',passport.userAuth,imageUpload, editBlogProcess)
router.post('/edit/:id', imageUpload, updateBlogProcess)

router.post('/blogDetails/:id', commentProcess)
router.get('/blogDetails/delete/:id',passport.userAuth, commentDelete)
router.get('/blogDetails/edit/:id',passport.userAuth, commentEdit)
router.post('/blogDetails/update/:id',passport.userAuth, commentUpdates)

router.get('/about', passport.userAuth, profilePage)
router.get('/editProfile', passport.userAuth,editProfile)
router.post('/editProfile', passport.userAuth,profileUploads, updateProfile)

router.get("/blogDetails/:id/like",passport.userAuth, likeBlog);
router.get("/blogDetails/:id/dislike",passport.userAuth, dislikeBlog);
router.get("/category", passport.userAuth, categoryPage)


module.exports = router