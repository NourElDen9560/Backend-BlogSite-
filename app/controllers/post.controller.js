const PostModel = require("../../database/models/post.model")
const res_gen = require("../helper/result").res_gen

class Post {

  static CreatePost = async (req, res)=>{
    try{
      const user = req.user

        const newpost = new PostModel(req.body)
        newpost.author = user.id
        await newpost.save()
        res_gen(res , 200 ,newpost , " Post created successfully " )    
    }
   catch(err){
    res_gen(res, 400 , "Error creating post" , err.message)
   }

  }

static ShowAllPosts = async (req, res)=>{
  try{
const Allposts = await PostModel.find();
res_gen(res, 200 ,Allposts, "All posts Displayed successfully")
  }
  catch(err){
    res_gen(res, 400 , "Error showing all posts" , err.message)
  }
}

  static DeletePost = async (req, res)=>{
    try{
      const postid = req.params.id 
      const Deletedpost = await PostModel.findByIdAndDelete(postid)
      if(!Deletedpost)
      res_gen(res ,400 , "Post Id don't found" , e.message)
      res_gen(res , 200 , Deletedpost , "Post Deleted Successfully")
    }
    catch(e){
      res_gen(res ,400 , "Post don't found" , e.message)
    }
    
  }
 static EditPost = async (req, res)=>{
  try{
  const postid = req.params.id
  const author = req.user
  const Post = await PostModel.findById(postid)
  if(author.id == Post.author){
const Updatedpost = await PostModel.findByIdAndUpdate(postid , req.body)
await Updatedpost.save()
res_gen(res ,200 ,Updatedpost ,"Post Updated Successfully" )
  }
  else {
throw new Error("You are not allowed to edit this post")
  }
  }
  catch(e){
    res_gen(res ,400 , " Error updating post" , e.message)
  }
 }

 static Addcomment = async (req, res)=>{
try{
const userr = req.user
const postid = req.params.id
const Post = await PostModel.findById(postid)
Post.comments = Post.comments.concat({user:userr.id , content: req.body.content })
await Post.save()
res_gen(res , 200 , Post , "Comment Added Sucessfully ")
}
catch(e){
  res_gen(res ,400 , " Error adding comment " , e.message)
}
 }

 static DeleteComment = async (req, res)=>{

  try{
     
    const postid = req.params.postid
    const commentid = req.params.commentid

    const Post = await PostModel.findById(postid)
    Post.comments = Post.comments.filter(c=> c.id != commentid)
    await Post.save()
    res_gen(res , 200 , Post , "Comment Deleted Sucessfully ")


  }
  catch(e){
    res_gen(res , 400 , " Cannot Delete Comment ")
  }

 }

 static AddLikeToPost = async (req, res)=>{
  try{
    const userr = req.user
    const postid = req.params.id
    const Post = await PostModel.findById(postid)
    const IfCommented_Before = await PostModel.findOne({'likes.user' :userr.id})
    if(IfCommented_Before)
      throw new Error (" You Already have a Like Before ") 
   Post.likes = Post.likes.concat({user:userr.id})
    await Post.save()
    res_gen(res , 200 , Post , "Like Added successfully ")


  }
  catch(e){
    res_gen(res ,400 , " Error Adding Like To post" , e.message)
  }
 }

 static DeleteLikeFromPost = async (req, res)=>{
try{
const userid = req.user.id
const postid = req.params.id
const Post = await PostModel.findById(postid)
Post.likes = Post.likes.filter(like=>like.user!= userid)
await Post.save()
res_gen(res , 200 , Post , "Like Deleted Successfully")

}
catch(e){
  res_gen(res , 404 , " Cannot Delete Like From This Post" , e.message)
}
 }

 

}

module.exports = Post
