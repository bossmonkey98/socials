import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:40
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:40
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    friends: {
        type: Array,
        default:[]
    },
    imagePath:{
        type:String,
        default:""
    },
    occupation:String,
    location: String
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User