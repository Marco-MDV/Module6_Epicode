const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 3001
const errorHandler404 = require('./middleware/errorHeadler404/errorHeadler404')
require('dotenv').config()
app.use(cors());

const {authors} = require('./routes/authors/authors')
const blogPost = require('./routes/blogPost/blogPost')
const W2D1 = require('./routes/W2D1/W2D1Routes')
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',console.error.bind(console,'DB connection error!'))
db.once('open', ()=>{console.log('db connected successfully');})

app.use(express.json())
app.use('/', authors)
app.use('/', blogPost)
app.use('/', W2D1)
app.use(errorHandler404)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

