const cloudinary = require('cloudinary').v2
const dotenvx = require('@dotenvx/dotenvx')

dotenvx.config({ path: '.env' });

cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_ID,
    api_secret: process.env.CLOUD_SECRET_KEY

})

module.exports = cloudinary