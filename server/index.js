import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { register } from './controller/auth.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'


/* configurations */
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)
const app = express()
dotenv.config()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirName,'public/assets')))

// STORAGE

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/assets')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage})

// Routes with files
app.post('/auth/register',upload.single("picture"),register)

// Routes
app.use('/auth',authRoutes)
app.use('/user',userRoutes)
// MONGOOSE
const port = process.env.PORT || 6000

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(port,()=>console.log("port",port))
})

export default app