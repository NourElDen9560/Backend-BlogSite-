const router = require('express').Router();
const Postcontroller = require("../app/controllers/post.controller")
const { authUser, authAdmin , authAuthor } = require("../middleware/authentication")

router.post("/createpost" , authUser , Postcontroller.CreatePost)
router.delete("/deletepost/:id" , authUser , Postcontroller.DeletePost)
router.get("/showposts" , authUser , Postcontroller.ShowAllPosts)
router.post("/editpost/:id" , authUser , Postcontroller.EditPost)
router.post("/addcomment/:id" , authUser , Postcontroller.Addcomment)
router.post("/addlike/:id" , authUser , Postcontroller.AddLikeToPost)
router.delete("/deletelike/:id" , authUser , Postcontroller.DeleteLikeFromPost)
router.delete("/deletecomment/:postid/:commentid" , authUser , Postcontroller.DeleteComment)

module.exports = router