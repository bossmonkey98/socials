import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'


export const register = async(req,res)=>{
    try{
        const userData = req.body;
        const email = userData.email
        const user = await User.findOne({ email:email })
        if(user) return res.status(401).json({msg:"User already registered"})
        
        const salt = await bcrypt.genSalt()
        const passHash = await bcrypt.hash(userData?.password,salt)

        const newUser = new User({...userData , password:passHash})
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    }catch(error){
        res.status(500).json({error:error.message})
    }
}

export const login = async(req,res) =>{
    try{
    const {email ,password} = req.body
    const user = await User.findOne({email:email})
    console.log('user',user)
    if(!user) res.status(401).json({msg:"User doesn't exist"})

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(401).json({msg:"Invalid Credentials"})

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({token:token,user})

}catch(err){
    res.status(500).json({error:err.message})
}

}