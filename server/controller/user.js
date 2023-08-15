import User from '../models/user.js'

const getUser = async (req,res)=>{
    try{
        const id = req.params.id
        console.log("#######",id)
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json({message:err.message})
    }
}

const getUserFriends = async(req,res)=>{
    try{
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user.friends)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const addRemoveFriend = async(req,res)=>{
    try{
        const {id ,friendId} = req.params
        const user= await User.findById(id)
        const Friend = await User.findById(friendId)
        
        if(user.friends.filter((i)=>i._id !== Friend._id)){
            console.log("@@@@")
            user.friends = user.friends.filter((i)=>i._id !== Friend._id)
            await user.save()
            res.status(200).json(user.friends)
        }
        else {
            user.friends.push(Friend)
            await user.save()
            res.status(200).json(user.friends)
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export {getUser , getUserFriends , addRemoveFriend}