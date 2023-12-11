const { Router } = require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {PostModel}=require("../model/post.model")
const postRouter=Router()
require('dotenv').config()

postRouter.get("/",async(req,res)=>{

//   const {device1,device2}=req.query;
//   const {userID}=req.body;
//   const query={}
//   if(userID){
//     query.device=userID;
//   }

//   if(device1 && device2){
//     query.device={$and:[{device:device1},{device:device2}]};

//   }else if(device1){
//     query.device=device1;
//   }else if(device2){
//     query.device=device2
//   }
    try {
        
            const post=await PostModel.find({userID:req.body.userID})
        

        res.status(200).send({msg:"User Posts",post})
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }

})



postRouter.post("/add",async(req,res)=>{
     const {userID}=req.body;

    try {
        const post=new PostModel({...req.body,userID});
        await post.save();
        res.status(200).send({msg:"Post was added"});
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }
})


postRouter.patch("/update/:postID",async(req,res)=>{
     const {postID}=req.params;
     const {userID}=req.body;

    try {
        const post=await PostModel.findByIdAndUpdate({userID,_id:postID},req.body)
        if(post){
            res.status(200).send({msg:"Post updated"});  
        }else{
            res.status(200).send({msg:"Post not found"});
        }
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }
})


postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params;
    const {userID}=req.body;

   try {
       const post=await PostModel.findByIdAndDelete({userID,_id:postID})
       if(post){
           res.status(200).send({msg:"Post Deleted"});  
       }else{
           res.status(200).send({msg:"Post not found"});
       }
   } catch (error) {
       res.status(400).send({error:error.message}) 
   }
})


module.exports={postRouter}