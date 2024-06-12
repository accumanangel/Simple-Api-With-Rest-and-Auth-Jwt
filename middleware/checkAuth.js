import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()

export const authCheck = async (req,res,next) => {
    let token = req.header('x-auth-token')

    // if token is available
    if (!token) {
        return res.status(400).json({
            msg:"Access Denied"
        })
    }


    
    try {

        let user = jwt.verify(token,process.env.SECRET)

        req.user = {
            email:user.email,
            id:user.id
        }
        

        next()

    } catch (error) {
        res.status(400).json({
            errors:{
                msg: "Invalid token!"
            }
        })
    }

}