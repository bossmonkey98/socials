import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'


export const register = async(req,res)=>{
    try{
        const userData = req.body;
        const email = userData.email
        const user = await User.findOne({ email:email })
        console.log(user,"sdfsdfsfsd")
        if(user) {res.status(400).send("User already registered")}
        else{
        const salt = await bcrypt.genSalt()
        const passHash = await bcrypt.hash(userData?.password,salt)

        const newUser = new User({...userData , password:passHash})
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}