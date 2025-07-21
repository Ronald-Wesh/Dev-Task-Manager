const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({//new schema — this is like a blueprint or structure for what a "Task" should look like in the database.
    title:{type:String,required:true},
    description:String,
    completed:{type:Boolean,default:false},
    //"Each task belongs to a user, and I want to store the user's ID here
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"}//relationship between a task and a user.
    //Foreign Key=value of owner should be an ObjectId
});
module.exports=mongoose.model("Task",taskSchema);//Now create a Mongoose model based on that schema