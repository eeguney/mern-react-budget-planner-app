import express from "express"
// controller imports
import { fetchData, newRecord, addToRecord } from "../controllers/dataController.js"
// middleware imports
import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router()

// routers
router.post('/newrecord', verifyToken, newRecord)
router.put('/addtorecord/:userID', verifyToken, addToRecord)
router.get('/:id', verifyToken, fetchData)

export default router;