const express = require('express')
const authors = express.Router()
const UserModel = require('../../models/userModel/users')

/* tutti gli autori */
authors.get('/authors', async (req, res) => {
    const {page=1, pageSize=10} = req.query
    try {
        const users = await UserModel.find().limit(pageSize).skip((page-1)*pageSize)
        const totPost = await UserModel.countDocuments()
        const totPages = Math.ceil(totPost / pageSize)
        res
            .status(200)
            .send({
                page:+page,
                totPages:+totPages,
                pageSize:+pageSize,
                users
            })
    } catch (e) {
        res
            .status(500)
            .send({
                status: 500,
                message: 'impossible to continue with this request',
                error: e.message
            })
    }
})

/* crazione nuovo utente */
authors.post('/authors', async (req, res) => {
    const newUser = new UserModel({
        nome: req.body.nome,
        email: req.body.email,
        cognome: req.body.cognome,
        dateOfBirth: new Date(req.body.dateOfBirth),
        avatar: req.body.avatar
    })

    try {
        const userExistent = await UserModel.findOne({ email: req.body.email })
        if (userExistent) {
            return res
                .status(409)
                .send({
                    status: 409,
                    message: 'user already exist',
                    error: e.message
                })
        }

        const saveUser = await newUser.save()
        res
            .status(201)
            .send({
                statusCode: 201,
                message: 'user created',
                saveUser
            })
    } catch (e) {
        res
            .status(500)
            .send({
                status: 500,
                message: 'impossible to continue with this request',
                error: e.message
            })
    }
})

/* singolo autore */
authors.get('/authors/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const userExistent = await UserModel.findById(userId)
        if (!userExistent) {
            return res
                .status(404)
                .send({
                    status: 404,
                    message: 'user not found',
                })
        }
        res
            .status(200)
            .send(userExistent)
    } catch (e) {
        res
            .status(500)
            .send({
                status: 500,
                message: 'impossible to continue with this request',
                error: e.message
            })
    }
})

/* eliminazione user */
authors.delete('/authors/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const user = await UserModel.findByIdAndDelete(userId)
        if (!user) {
            return res
                .status(404)
                .send({
                    status: 404,
                    message: 'user not found',
                })
        }
        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'user deleted',
                user
            })
    } catch (e) {
        res
            .status(500)
            .send({
                status: 500,
                message: 'impossible to continue with this request',
                error: e.message
            })
    }
})

/* modifica user */
authors.put('/authors/:userId', async (req, res) => {
    const { userId } = req.params
    const userMod = req.body
    const options ={new:true}

    if (userMod.dateOfBirth) {
        dateOfBirth=new Date(userMod.dateOfBirth)
    }

    const user = await UserModel.findByIdAndUpdate(userId)
    if (!user) {
        return res
            .status(404)
            .send({
                status: 404,
                message: 'user not found',
            })
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, userMod, options)
        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'user updated',
                user
            })
    } catch (e) {
        res
            .status(500)
            .send({
                status: 500,
                message: 'impossible to continue with this request',
                error: e.message
            })
    }

})

/* modifica di un singolo campo dell'utente */
authors.patch('/authors/:userId', async (req, res) => {
    const { userId } = req.params
    const userMod = req.body
    const options ={new:true}

    if(userMod.dateOfBirth){
        dateOfBirth=new Date(userMod.dateOfBirth)
    }
    const user = await UserModel.findByIdAndUpdate(userId)
    if (!user) {
        return res
            .status(404)
            .send({
                status: 404,
                message: 'user not found',
            })
    }
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, userMod, options)
        res
           .status(200)
           .send({
                statusCode: 200,
                message: 'user updated',
                user
            })
        
    } catch (e) {
        res
            .status(500)
            .send({
                status: 500,
                message: 'impossible to continue with this request',
                error: e.message
            })
    }
})

module.exports = {authors}

