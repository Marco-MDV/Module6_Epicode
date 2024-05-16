const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    cognome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
},{timestamps: true, strict:true})

module.exports = mongoose.model('UserModel', UserSchema, 'users');
/* dataDiNascita */