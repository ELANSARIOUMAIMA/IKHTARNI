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
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';


import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fetch from 'node-fetch';
import User from './models/User.js';
import Job from './models/job.js';
import JobAplication from './models/JobApplication.js';
import { Query } from 'mongoose';


 






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






//


















