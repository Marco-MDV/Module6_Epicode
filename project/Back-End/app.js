const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 3001
require('dotenv').config()
app.use(cors());

const {authors} = require('./routes/authors/authors')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',console.error.bind(console,'DB connection error!'))
db.once('open', ()=>{console.log('db connected successfully');})

app.use(express.json())
app.use('/', authors)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})