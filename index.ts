import express from 'express'
import userRouter from './Routers/userRoutes.js'
import patientsRouter from './Routers/patientsRoutes.js'
import connectDB from ' ./models/ConnectDB.js'

connectDB()
const app = express()

app.use(express.json())

const PORT = 3000

app.use(patientsRouter)
app.use(userRouter)

app.listen(PORT,()=>
	  console.log(`Server stated correctly in port `${PORT}`)
	  )
