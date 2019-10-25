# classic-social-network
READ-ME!

This is a clone of a social network found pre-2010 era, mostly inspired by older versions of Twitter and Yahoo Meme. The user will be able to register, login, make posts

## User Stories
* Users will be able to crea


## MVC Data
* EJS templates will hold and display certain data about certain posts, including how many people have added to their favorites, as well as how many comments there are.

```
const userSchema = new mongoose.Schema(
    {
        username: { type: String , required: true},
        email: { type: String, required: true },
        password: { type: String, required: true },
        date: { type: Date , default: Date.now },
        posts: { type: Array },
        favorites: { type: Array }
    }
);
```