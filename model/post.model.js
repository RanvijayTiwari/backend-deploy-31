const mongoose=require("mongoose")
const Postschema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
})

const PostModel=mongoose.model("post",Postschema)

module.exports={
    PostModel
}