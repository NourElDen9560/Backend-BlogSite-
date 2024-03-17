const userModel = require("../../database/models/user.model")
const res_gen = require("../helper/result").res_gen
const bcryptjs = require("bcryptjs")
class User{
    static Register = async (req , res)=>{
     try{
         const User = new userModel(req.body)
         console.log(User)
         
         await User.save()
        res_gen(res , 200 , User , "Registered successfully"); 
     }
     catch(err){
        res_gen(res , 404 , "Cannot create user" ,err.message); 
     }
     
    }
     
     static ShowAll = async (req, res)=>{
         try{
           
             const AllUsers = await userModel.find();
            res_gen(res , 200 ,AllUsers , " Successfully Proccessed"); 
         }
         catch(err){
            res_gen(res , 404 , "404 Not Found" ,err.message); 
         }
         
     }

     static login = async(req, res)=>{
      try{
          const UserData = await userModel.LoginUser(req.body.email , req.body.password)
    const token =await UserData.GeneraterTokens();
 res_gen(res , 200 , {UserData, token} ,  "Loggin authenticated")
      }
      catch(e){     
         res_gen(res , 404 , "Try Again Email Or Password wrong " ,e.message); 
      }
  }
 static Myprofile = async (req , res)=>{
try{
   console.log("Myprofile")
   res_gen(res , 200 , req.user , "Data Loaded Successfully")

}
catch(e){
   res_gen(res , 400 , "No user founded in database" , e.message)
}

}

static logout = async (req, res)=>{
   const User = req.user
   const token = req.token
   try{
      // keep all tokens don't match the current token
     User.tokens = await User.tokens.filter(t => t.token != token);
     await User.save();
      res_gen(res , 200 ,User, "Logged out successfully"); 
   }
   catch(err){
      res_gen(res , 404 , "You are not Logged In " ,err.message); 
   }
}

static editPassword =async (req, res)=>{
   const User = req.user
  
   const Newpassword = req.body.password
   try{
       const CheckPasswordMatching = await bcryptjs.compare(Newpassword  ,User.password)
    if(CheckPasswordMatching) 
    throw new Error("New Password equal Old password") 
     User.password = Newpassword
     await User.save();
      res_gen(res , 200 , User , " successfully edit Password"); 
   }
   catch(err){
      res_gen(res , 404 , "CANNOT EDIT PASSWORD" ,err.message); 
   }
}

static UpdateProfile= async (req, res)=>{
   const User = req.user 
   const id = User._id
   const UpdatedData = req.body
   try{
if(UpdatedData.password){
   const Newpassword = req.body.password
   const CheckPasswordMatching = await bcryptjs.compare(Newpassword  ,User.password)
   if(CheckPasswordMatching) 
   throw new Error("New Password equal Old password") 
   const UpdatedUser = await userModel.findByIdAndUpdate(id ,UpdatedData )
   UpdatedUser.password = Newpassword

   await UpdatedUser.save();
     res_gen(res , 200 , UpdatedUser , " successfully Updated Profile "); 
}
else{
   const UpdatedUser = await userModel.findByIdAndUpdate(id ,UpdatedData )
   await UpdatedUser.save();
   res_gen(res , 200 , UpdatedUser , "Updated Profile successfully")
}

   } 
   catch(err){
      res_gen(res , 404 , "CANNOT UPDATE Your profile" , 'ERROR: '+err.message)
   }
}

static DeleteUser = async (req,res)=>{
try{

   const id = req.params.id 
   const DeletedUser = await userModel.findByIdAndDelete(id)
   if(!DeletedUser)
throw new Error("User not found ")
   res_gen(res , 200 , DeletedUser , "Deleted User successfully")

}
catch(e){
   res_gen(res , 404 , "CANNOT DELETE User " , 'User Not found  '+e.message)


}

}

}
module.exports = User;