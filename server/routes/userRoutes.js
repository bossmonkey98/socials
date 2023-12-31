import express from 'express'
import { getUser,addRemoveFriend,getUserFriends } from '../controller/user.js'
import verifyToken from "../middleware/auth.js"

const router = express.Router()

router.get("/:id",verifyToken,getUser)

router.get("/friends/:id",verifyToken,getUserFriends)

router.patch("/:id/:friendId",verifyToken,addRemoveFriend)

export default router
