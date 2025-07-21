//Responsible for connection to Db 
const mongoose=require('mongoose');

//connect to mongoDb using mongoose
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)//Opens connection to Db
        console.log("MongoDb connected Succcessfully");
    } catch (error) {
        console.error("MongoDb connetion Failed:".error.message)
        process.exit(1);//Shuts Don ap if connection fails
    }
}
module.exports=connectDb;