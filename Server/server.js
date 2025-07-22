require("dotenv").config();// Loads environment variables from a .env file into process.env.
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");

const app=express();//Initializes an Express application instance so you can define routes and middleware on it.
connectDB();//Calls the connectDB function to connect your server to MongoDB right when the server starts.

app.use(cors());// frontend-backend communication).
app.use(express.json());//Middleware that tells Express to parse JSON data in incoming requests 

app.use("/api/auth",require("./routes/authroutes"));//Sets up a route prefix for authentication routes.

//🛣️ All routes inside authroutes.js will be accessible at /api/auth/....
app.use("/api/tasks",require("./routes/taskRoutes"));

const PORT=process.env.PORT ||5000;
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));