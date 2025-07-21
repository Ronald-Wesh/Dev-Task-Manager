//This file protects private routes.=Verifies the token 
const jwt=require('jsonwebtoken');//Verify Tokens

//Checks for token and sets req.user
exports.protect=(req,res,next)=>{
    const auth=req.headers.authorization;//gets the authorization header from the request.
     //token is usually passed in the header
    if(!auth || !auth.startsWith("Bearer ")) return res.status(401).json({message:"No Token/Unauthorized"});
    // Is there an Authorization header/TOKEN?
    // Does it start with "Bearer "?

    const token=auth.split(" ")[1];//separates "Bearer" and the actual token.
    try{
        //You now know who the user is in every route — no need to log in again until the token expires.
        //“Take the token, unlock it using our secret key, and give us the original data inside (like user id and role).”
        const decoded=jwt.verify(token,process.env.JWT_SECRET);//Checks if token is valid or expired
    // token contains:// The user’s id// The user’s role// And a secret signature to make sure it wasn’t changed
        req.user=decoded;//{id,role} Saves user info for later use in the request req.user.
        next();//If everything was fine, call next() to go to the next middleware
    }catch(error){
        return res.status(403).json({message:"Invalid Token"});
    }
};

//Check Roles
exports.authorize=(roles)=>{
    return (req,res,next)=>{//returns a middleware function
        if (!roles.includes(req.user.role)) return res.status(403).json({message:"For diff Role"});// checks if the user’s role (saved in req.user.role by the protect middleware from earlier)
        //  is included in the allowed roles.
        next();//passes control to the next step if everything is okay
    };
};