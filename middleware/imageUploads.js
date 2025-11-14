const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configs/cloudinary');

// Single storage that handles all three types based on fieldname
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === 'profileImage') {
      return {
        folder: 'blogProfileImagesFolder',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp', 'avif'],
        transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }]
      };
    }
    if (file.fieldname === 'coverImage') {
      return {
        folder: 'blogCoverImagesFolder',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp', 'avif'],
        transformation: [{ width: 1200, crop: 'limit' }]
      };
    }
    // default blog image
    return {
      folder: 'blogImagesFolder',
      allowed_formats: ['jpeg', 'png', 'jpg', 'webp', 'avif'],
      transformation: [{ width: 1200, crop: 'limit' }]
    };
  }
});

// Upload middlewares
const imageUpload = multer({ storage }).single('blogImage');
const profileUploads = multer({ storage }).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]);

module.exports = { imageUpload, profileUploads };
