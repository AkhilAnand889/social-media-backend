const express = require('express')
const app = express()
const cors = require('cors')
const { default: mongoose } = require('mongoose')
require('dotenv').config();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended : false } ))

mongoose.connect("mongodb://127.0.0.1:27017/",{useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true})
.then( () => console.log('mongoDB connected') ).catch( (err) => console.log('there has an error in :'+err) );

// middleware for authentication
app.use('/auth', require('./routes/userRoutes'))

// middleware for update user
app.use('/update', require('./routes/updateRoutes'))

// middleware for posts
app.use('/post', require('./routes/postRoutes'))

// middleware for like
app.use('/post', require('./routes/likeRoutes'))

// middleware for dislike
app.use('/post', require('./routes/dislikeRoutes'))

// middleware for comments
app.use('/post', require('./routes/commentRoutes'))

// middleware for friendsRoute
app.use('/friend', require('./routes/friendRoutes'))

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Social Media Backend listening on http://localhost:${port}`)
})