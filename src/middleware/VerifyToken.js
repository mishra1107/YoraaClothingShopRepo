require('dotenv').config()
const jwt=require('jsonwebtoken')


exports.verifyToken=async(req,res,next)=>{
    try {
        // extract the token from request cookies
        const token=req.headers.token;

        // if token is not there, return 401 response
        if(!token){
            return res.status(401).json({message:"Token missing, please login again"})
        }
        console.log("The token is ",token);

        // verifies the token 
        const decodedInfo=jwt.verify(token,process.env.SECRET_KEY)
        console.log("the decoded info is ",decodedInfo);
        // checks if decoded info contains legit details, then set that info in req.user and calls next
        if(decodedInfo && decodedInfo.name && decodedInfo.phoneNo){
            req.user=decodedInfo;
            console.log(decodedInfo);
            next()
        }

        // if token is invalid then sends the response accordingly
        else{
            return res.status(401).json({message:"Invalid Token second waala, please login again"})
        }
        
    } catch (error) {

        console.log(error);
        
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired, please login again" });
        } 
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token, please login again" });
        } 
        else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}