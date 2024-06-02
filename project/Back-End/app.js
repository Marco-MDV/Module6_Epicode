const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 3001
const errorHandler = require('./middleware/errorHeadler/errorHeadler')
const errorHeadlerAstract = require('./middleware/errorHeadlerAstract/errorHeadlerAstract')
require('dotenv').config()
app.use(cors());

const {authors} = require('./routes/authors/authors')
const blogPost = require('./routes/blogPost/blogPost')
const W2D1 = require('./routes/W2D1/W2D1Routes')
const registration = require('./routes/registration/registration');
const email = require('./routes/email/email');
const login = require('./routes/login/login');
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',console.error.bind(console,'DB connection error!'))
db.once('open', ()=>{console.log('db connected successfully');})

app.use(express.json())
app.use('/', authors)
app.use('/', blogPost)
app.use('/', W2D1)
app.use('/', registration)
app.use('/', email)
app.use('/', login)
app.use(errorHeadlerAstract)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

