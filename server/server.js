import './config/instrument.js'
import * as Sentry from "@sentry/node"


import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'

import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from'./routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
import dotenv from 'dotenv';
import path from 'path';
import 'dotenv/config';




 


dotenv.config({ path: path.resolve('./server/.env') }); // chemin vers ton .env



// Initialize Express
const app =express()

// connect to the database
await connectDB()//we have successfyly create the  connection between express app and mongoodb
await connectCloudinary()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


// Routes
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)


app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)





// Port 
const PORT=process.env.PORT||5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);


})

























