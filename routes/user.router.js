const router = require("express").Router()
const userController = require("../app/controllers/user.controller")
const { authUser, authAdmin } = require("../middleware/authentication")


// User
router.post("/register", userController.Register)
router.get("/allusers", userController.ShowAll)
router.post("/login", userController.login)
router.get("/myprofile", authUser,userController.Myprofile)
router.get("/logout", authUser,userController.logout)
router.put("/editpassword", authUser,userController.editPassword)
router.put("/updateprofile", authUser,userController.UpdateProfile)
router.delete("/deleteuser/:id", authUser, userController.DeleteUser) 
module.exports=router