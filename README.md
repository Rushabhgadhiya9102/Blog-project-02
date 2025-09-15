## Blog-project-02

This is a full-stack blog application built with Node.js, Express, MongoDB, and EJS. It features user authentication, blog post creation, editing, deletion, commenting, and liking/disliking functionalities. Cloudinary is integrated for image uploads.

### Demo

[https://blog-project-02.onrender.com](https://blog-project-02.onrender.com)

### Features

*   **User Authentication:**
    *   User signup and login using `bcrypt` for password hashing.
    *   User profile management (update username, bio, email, profile image, cover image).
    *   Change password functionality.
    *   Delete account functionality (deletes user, their comments, and removes their likes/dislikes from blog posts).
*   **Blog Management:**
    *   Create new blog posts with a title, category, content, and an optional image.
    *   Edit existing blog posts.
    *   Delete blog posts.
    *   View all blog posts.
    *   View individual blog post details.
    *   Filter blog posts by category.
    *   Like and dislike blog posts.
*   **Commenting System:**
    *   Add comments to blog posts.
    *   Edit comments.
    *   Delete comments.
*   **Image Uploads:**
    *   Integrated with Cloudinary for storing blog images, user profile images, and cover images.
    *   `multer` and `multer-storage-cloudinary` are used for handling file uploads.
*   **Database:**
    *   MongoDB is used as the database, with Mongoose as the ODM.
*   **Templating:**
    *   EJS (Embedded JavaScript) is used for server-side rendering of dynamic content.
*   **Environment Variables:**
    *   `dotenvx` is used for managing environment variables securely.

### Technologies Used

*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB (via Mongoose)
    *   Bcrypt (for password hashing)
    *   Passport.js (for authentication)
    *   Cloudinary (for image storage)
    *   Multer (for handling file uploads)
    *   Multer-storage-cloudinary
    *   dotenvx (for environment variables)
*   **Frontend:**
    *   EJS (Templating Engine)
    *   HTML, CSS, JavaScript

### Installation and Setup

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/Blog-project-02.git
cd Blog-project-02
```

**2. Install dependencies:**

```bash
npm install
```

**3. Set up environment variables:**

Create a `.env` file in the root directory of the project and add the following:

```
MONGO_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_ID=your_cloudinary_api_key
CLOUD_SECRET_KEY=your_cloudinary_api_secret
SESSION_SECRET=a_strong_random_string_for_session_secret
```

*   **`MONGO_URL`**: Your MongoDB connection string. You can get this from MongoDB Atlas or your local MongoDB instance.
*   **`CLOUD_NAME`**, **`CLOUD_API_ID`**, **`CLOUD_SECRET_KEY`**: Your Cloudinary credentials. Sign up for a free account at [Cloudinary](https://cloudinary.com/) to get these.
*   **`SESSION_SECRET`**: A long, random string used to sign the session ID cookie.

**4. Run the application:**

```bash
npm start
```

The application will be accessible at `http://localhost:3000` (or the port specified in your Express app).

### Project Structure

```
Blog-project-02/
├── configs/
│   ├── cloudinary.js       # Cloudinary configuration
│   └── database.js         # MongoDB connection setup
├── controllers/
│   ├── authcontorllers.js  # User authentication logic
│   ├── blogcontrollers.js  # Blog post CRUD operations
│   ├── commentcontroller.js # Comment and like/dislike logic
│   └── pagescontrollers.js # Renders various pages
├── middleware/
│   ├── imageUploads.js     # Multer and Cloudinary image upload middleware
│   └── passport.js         # Passport.js authentication setup
├── models/
│   ├── blogSchema.js       # Mongoose schema for blog posts
│   ├── commentSchema.js    # Mongoose schema for comments
│   └── userSchema.js       # Mongoose schema for users
├── public/                 # Static assets (CSS, JS, images)
├── routes/
│   └── web.js              # Defines all application routes
├── views/                  # EJS templates
│   ├── layouts/
│   ├── pages/
│   └── partials/
├── .env                    # Environment variables (create this file)
├── .gitignore
├── app.js                  # Main application entry point
├── package.json
└── README.md
```

### API Endpoints (Examples)

*   `GET /login`: Renders the login page.
*   `POST /signup`: Handles user registration.
*   `GET /`: Renders the homepage with all blog posts.
*   `GET /addBlog`: Renders the add new blog post page.
*   `POST /addBlog`: Handles new blog post creation.
*   `GET /blogDetails/:id`: Renders the details page for a specific blog post.
*   `POST /comment/:id`: Adds a comment to a blog post.
*   `GET /like/:id`: Handles liking a blog post.
*   `GET /dislike/:id`: Handles disliking a blog post.
*   `GET /myBlogs`: Renders the user's own blog posts.
*   `GET /editBlog/:id`: Renders the edit blog post page.
*   `POST /updateBlog/:id`: Handles updating a blog post.
*   `GET /deleteBlog/:id`: Handles deleting a blog post.
*   `GET /about`: Renders the user profile page.
*   `GET /editProfile`: Renders the edit profile page.
*   `POST /updateProfile`: Handles updating user profile information.
*   `GET /changePass`: Renders the change password page.
*   `POST /changePass/:id`: Handles changing user password.
*   `GET /deleteAccount`: Handles deleting user account.
*   `GET /logout`: Handles user logout.

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
