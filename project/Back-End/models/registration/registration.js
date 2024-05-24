const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    avatar:{
        type:Object,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true, strict:true})
module.exports = mongoose.model('registrationSchema', registrationSchema, 'registration');
