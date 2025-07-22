//cOMMS btw backend and Frontend
//Axios simplifies HTTP requests like: GET, POST, PUT, and DELETE.
import axios from 'axios';
 const API=axios.create({//custom Axios MESSENGER API
    baseURL:"http://localhost:5000/api",//Every time you go to the backend, always start with this URL
 });

 API.interceptors.request.use(cfg=>{//dds an Axios request interceptor.=
    //.use() = You’re telling axios: “Run this function before sending the request.”
    //interceptors=checkpoint or guard that runs before a request is sent.
    const token =localStorage.getItem("token");//gets a token from your browser's local storage
  //  getItem("token") looks for a saved item named "token".
    // 🧠 This token is usually what you got after logging in, and you need to send it with each request so the backend knows who you are.
    if (token) cfg.headers.Authorization=`Bearer ${token}`;
    //This is how the backend knows “Ah! This user is logged in and allowed to access.”
    //If there is a token, this line adds it to the Authorization header of your request.
    return cfg;//You must return the cfg (config) so axios can use it to actually send the request.
 });
  export default API;
//  You create a custom axios messenger (API) with a base URL.

// Before sending any request, you check:

// “Is there a token in the browser?”

// If yes, you attach the token to the request as a proof of login.

// Then the request goes to the backend, and the backend sees:

// “Oh, this user is logged in, they’re allowed to get data.