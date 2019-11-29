# classic-social-network
READ-ME!

This is a clone of a social network found pre-2010 era. The user will be able to register, login, make posts, and comment on these posts.

Technologies: HTML5, CSS3, JavaScript, MongoDB, Mongoose, Express.js, Node.js, bcrypt, EJS.

Open READ-ME! **[https://readme-messageboard.herokuapp.com/](https://readme-messageboard.herokuapp.com/)**.


## User Stories
* Users will be able to register or login to their account on the homepage (index route on app.js)
* On login (/posts), the user will be able to click on the navigation bar to access all posts made by all users on the site, as well as their own posts. They can add posts to their favorites list, and also see who has added a post to their favorites. They will be able to click to view their own profile. 
* /users/ will show all current users that exist on the site.
* On /users/:id, the user will be able to view their own profile and see a list of their own posts.
* On show page of each post, they will be able to add comments to the post, and also favorite the post. They should be able to navigate back to the index.

## MVC Data
* EJS templates will hold and display properties of a post, and all of the comments.

## Possible Future Features
* Customizable User Profiles
* User Profile Comments
* Users saving posts as favorites
* Better User Authentication (Passport.js)
* Improve Responsiveness on CSS

```
const userSchema = new mongoose.Schema(
    {
        username: { type: String , required: true},
        email: { type: String, required: true },
        password: { type: String, required: true },
        date: { type: Date , default: Date.now },
        photo: { type: String },
        posts: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' // references post
        }],
        favorites: [ 
                // favorite posts unshift here
        ]
    }
);
```

```
const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String },
        photo: { type: String },
        link: { type: String },
        comments: [
            // comments will go here
        ]
    }
)
```

```
  const commentSchema = mongoose.Schema({
        title: { type: String, required: true },
        body: { type: String, required: true }
    });
```