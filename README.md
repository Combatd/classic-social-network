# classic-social-network
READ-ME!

This is a clone of a social network found pre-2010 era, mostly inspired by older versions of Tumblr. The user will be able to register, login, make posts

## User Stories
* Users will be able to register or login to their account on the homepage (index route on app.js)
* On login (/posts), the user will be able to click on the navigation bar to access all posts made by all users on the site, as well as their own posts. They can add posts to their favorites list, and also see who has added a post to their favorites. They will be able to click to view their own profile. 
* /users/ will show all current users that exist on the site.
* On /users/:id, the user will be able to view their own profile information, access the edit profile (/user/:id/edit) function, and have a button available to access their favorite posts.
* users/:id/favorites, they can view their favorite posts. If they are viewing their own profile (logged in session), they will be able to delete posts from their own favorites list.
* On show page of each post, they will be able to add comments to the post, and also favorite the post. They should be able to navigate back to the index.

## MVC Data
* EJS templates will hold and display certain data about certain posts, including how many people have added to their favorites, as well as how many comments there are.

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
        favorites: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post' // reference post 
            }]
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