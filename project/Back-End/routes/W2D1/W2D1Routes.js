const express = require('express')
const W2D1 = express.Router()
const W2D1Schema = require('../../models/W2D1/W2D1Schema')

W2D1.get('/W2D1', async (req, res) => {
    try {
        const Users = await W2D1Schema.find()
        res.send(Users).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* 1 */
W2D1.get('/W2D1/IsActive', async (req, res) => {
    const { status } = req.params
    try {
        const Users = await W2D1Schema.find({ isActive: true })
        res.send(Users).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* 2 */
W2D1.get('/W2D1/ageOver26', async (req, res) => {
    try {
        const ageOver26 = await W2D1Schema.find({ age: { $gt: 26 }})
        res.send(ageOver26).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* 3 */
W2D1.get('/W2D1/ageOver26Under30', async (req, res) => {
    try {
        const ageOver26Under30 = await W2D1Schema.find({ age: { $gt: 26, $lt: 30 }})
        res.send(ageOver26Under30).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* 4 */
W2D1.get('/W2D1/brownANDblue', async (req, res) => {
    try {
        const brownAndBlue = await W2D1Schema.find({$or:[{"eyeColor":{$eq:'brown' }},{"eyeColor":{$eq:'blue'}}]})
        res.send(brownAndBlue).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* 5 */
W2D1.get('/W2D1/green', async (req, res) => {
    try {
        const differentByGreen = await W2D1Schema.find({"eyeColor":{$ne:'green'}})
        /* "eyeColor":{$not:{$eq:'green'}} */
        res.send(differentByGreen).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* 6 */
W2D1.get('/W2D1/greenAndBlue', async (req, res) => {
    try {
        const greenAndBlue = await W2D1Schema.find({"eyeColor":{$nin:["green","blue"]}})
        /* 
        $nor:[{"eyeColor":{$eq:'green'}},{"eyeColor":{$eq:'blue'}}]
        */
        res.send(greenAndBlue).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* 7 */
W2D1.get('/W2D1/email', async(req, res)=>{
    try {
        const email = await W2D1Schema.find(
            {company:'FITCORE'},
            {email:1}
        )
        res.send(email).status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = W2D1