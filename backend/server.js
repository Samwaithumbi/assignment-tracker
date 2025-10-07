const express = require('express')
const connectDb = require('./config/db.js')
const assignmentsRoutes= require('../backend/routes/assignments.routes')
const userRoutes= require('../backend/routes/user.routes')
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app=express()
const PORT= process.env.PORT || 5000


//middleware
app.use(express.json())
app.use(cors({
    origin: '*'
}))
//connect to mongodb
connectDb()

//listenning to the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT || 5000}`);

})

//definning routes
app.use('/assignments', assignmentsRoutes)
app.use('/user', userRoutes)
