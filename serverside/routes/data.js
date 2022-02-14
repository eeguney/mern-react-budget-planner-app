import express from "express"
// controller imports
import { fetchData, newRecord, addToRecord, deleteFund, deleteExpense } from "../controllers/dataController.js"
// middleware imports
import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router()

// routers
router.post('/newrecord', verifyToken, newRecord)
router.put('/addtorecord/:userID', verifyToken, addToRecord)
router.delete('/deletefund/:ID', verifyToken, deleteFund)
router.delete('/deleteexpense/:ID', verifyToken, deleteExpense)
router.get('/:id', verifyToken, fetchData)
export default router;