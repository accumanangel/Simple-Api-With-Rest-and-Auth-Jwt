import express from 'express'
import dotenv from "dotenv";
import { check,validationResult } from 'express-validator'
import { users } from '../data/users.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authCheck } from '../middleware/checkAuth.js';
import { posts } from '../data/posts.js';

dotenv.config()

const router = express.Router()


router.post('/signup',[
    check("email","Enter a valid email")
        .isEmail(),
    check("password","Password should be atleast 6 characters long")
        .isLength({min:6})
], async(req,res)=>{
    
    const errors=validationResult(req)

    // validating email and password
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    const {email,password}=req.body
    
    //checking if user exist
    let user = users.find(user => user.email === email)



    if(user){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "User already exist!"
                }
            ]
        })
    }

    // Harshing the password
    let harshedPassword = await bcrypt.hash(password,10)


    // Defining new user
    let newUser = {
        id: users.length+1,
        email:email,
        password:harshedPassword
    }

    // Adding new user
    let result = await users.push(newUser)





    // If user has been successfully added
    result && res.status(201).json({       
        "msg":"User Account Created!",
    });
})



/**
 * Login
 */
router.post('/signin',async (req,res)=>{
    const {email,password} = req.body

    let user = await users.find(user => user.email === email)

    if(!user){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid Credentials"
                }
            ]
        })
    }

    
    let isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid Credentials"
                }
            ]
        })
    }

    let token = jwt.sign(
        {
            email:user.email,
            id:user.id
        },
        process.env.SECRET,
        {
            expiresIn:'10min'
        }
    )


    res.status(200).json({
        msg:"Logged In Successfully",
        token
    })

})


/**
 * All Users
*/
router.get('/users',authCheck, async (req,res) => {
    res.status(200).json({
        users:users
    })
})

/**
 * User Post
*/
router.get('/posts',authCheck, async (req,res) => {
    const {id,email}=req.user

    let userPosts = posts.filter(post => post.author_id === id) 
    res.status(200).json({
        userPosts
    })
})

export default router;