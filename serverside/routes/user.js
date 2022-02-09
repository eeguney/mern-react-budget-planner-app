import express from "express"
// controller imports
import { signUp, signIn, fetchAnUser } from "../controllers/userController.js"

const router = express.Router()

// routers
router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/:id', fetchAnUser)

export default router;