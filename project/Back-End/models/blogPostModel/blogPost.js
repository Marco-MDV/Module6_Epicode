const mongoose = require('mongoose');
const BlogPostSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    cover:{
        imgPath:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    readTime:{
        value:{type:Number, required:true},
        unit:{type:String, required:true}
    },
    author:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    }
},{timestamps: true, strict:true})

module.exports = mongoose.model('BlogPost',BlogPostSchema)

