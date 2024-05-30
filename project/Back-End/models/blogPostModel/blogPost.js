const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
    comment:{
        type: 'string',
        required:true,
        }
},{timestamps:true,strict:true}) 


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
    },
    comments:[commentsSchema]
},{timestamps: true, strict:true})

module.exports = {
    BlogPostSchema: mongoose.model('BlogPost',BlogPostSchema),
    commentsSchema: mongoose.model('commentsSchema', commentsSchema)
}

