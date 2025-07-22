const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

//Signup Endpoint Logic
exports.signup=async(req,res)=>{
    const {username,email,password}=req.body;//GETS THE DATA INPUTED BY USER IN FRONTEND

    //Check if user is aready signed in=involve Db MODEL
    // const exists=await User.findOne({email});// returns a user document if found.
    // if (exists) return res.status(400).json({message:"User already Exists"});


      // Check if user already exists by email or username
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email already exists" });

    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).json({ message: "Username already exists" });

    const hashed=await bcrypt.hash(password,10);
    const user=await User.create({username,email,password:hashed});//adds a new user document to your MongoDB database with their email and hashed password.

    //the user’s MongoDB _id
    //login token using JWT.
    //{id:user._id,role:user.role}-Remember who is logged in
    //process.env.JWT_SECRET
    // This is your secret password used by the server to lock the token.
    // Only the server knows this secret, so it can later check if the token is real or fake.

     const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });//{ id: user._id, role: user.role }
        //This is the payload — the data you want to include inside the token
    res.json({token});//sends the token back to the frontend
};

//LOGIN ENDPOINT
exports.login=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user) return res.status(404).json({message:"Usere Not Found"});

    const match=await bcrypt.compare(password,user.password);
    if(!match) return res.status(401).json({message:"Incorrect Password"});

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });//{ id: user._id, role: user.role }
    //This is the payload — the data you want to include inside the token
    res.json({token});//sends the token back to the frontend
}