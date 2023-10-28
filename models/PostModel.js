const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    name:String,
    title:String,
    desc:String,
    file:String,
    email:String,
    displayText:String,
    imgLink:String,
    createOn:Date,
    updateOn:Date,
    category:String,
    likes:[String],
    comments:[{
        PostedBy:String,PostedOn:String,Desc:String,author:String,upVoteId:[String]
    }]
})

const PostModel=mongoose.model('posts',PostSchema)
module.exports=PostModel;