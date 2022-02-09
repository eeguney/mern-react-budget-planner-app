import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
// route imports
import userRoute from "./routes/user.js"
import dataRoute from "./routes/data.js"

dotenv.config()
const app = express()

app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use(cors())

// routes
app.use("/api/user", userRoute)
app.use("/api/data", dataRoute)

const PORT = process.env.PORT || 5000
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log("Server is running on port: "+PORT)))
.catch((error) => console.log(error))
