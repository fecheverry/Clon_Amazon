import jwt from 'jsonwebtoken'
import User from "../user/user.model.js";
export async function isAuthenticate(req, res, next) {
    try {
        const {token} = req.cookies;
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = await User.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}

export async function Verify(token){
    try {
        return jwt.verify(token, process.env.JWTKEY)
    }catch(e){
        return null
    }
}

