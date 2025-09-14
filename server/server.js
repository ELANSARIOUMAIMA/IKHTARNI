import './config/instrument.js'
import * as Sentry from "@sentry/node"
import os from 'os';

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


import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { spawn } from 'child_process';

import { fileURLToPath } from 'url';
import fs from 'fs';
import fetch from 'node-fetch';
import User from './models/User.js';
import Job from './models/job.js';
import JobAplication from './models/JobApplication.js';


 


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




//
app.use(cors());





app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());







// Routes
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)


app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)


// ES Modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/scores", async (req, res) => {
  try {
   
    const { userId, jobId } = req.body;
    const job = await Job.findById(jobId);
    const user = await User.findOne({ _id: userId });

    if (!user || !user.resume) return res.status(400).json({ error: "No resume URL" });

    // Télécharger le CV depuis Cloudinary
    const response = await fetch(user.resume);
    const buffer = await response.arrayBuffer();
    const tmpPath = path.join(__dirname, 'temp_resume.pdf');
    fs.writeFileSync(tmpPath, Buffer.from(buffer));


    // Lancer le script Python
    const scriptPath = path.join(__dirname, "../resume_matcher/resume_score.py");
    //const pythonPath = path.join(__dirname, '..', 'resume_matcher', 'venv', 'Scripts', 'python.exe');
    const pythonPath = os.platform() === 'win32'
    ? path.join(__dirname, '..', 'resume_matcher', 'venv', 'Scripts', 'python.exe')
    : 'python3';


    console.log("Running Python script:");
    console.log("Python path:", pythonPath);
    console.log("Script path:", scriptPath);
    console.log("Resume path:", tmpPath);
    console.log("Job description:", job.description);

    const pythonProcess = spawn(pythonPath, [scriptPath, tmpPath, job.description]);

    let score = '0';
    pythonProcess.stdout.on("data", data => score += data.toString());
    pythonProcess.stderr.on("data", data => console.error("Python error:",data.toString()));

    pythonProcess.on("close", async code => {
      fs.unlinkSync(tmpPath); // supprimer le fichier temporaire

      if (code === 0) {
        score = parseFloat(score);

        // Mettre à jour la collection JobApplication / applicant avec le score
        await JobAplication.findOneAndUpdate(
          { userId, jobId },
          { score },
          { new: true, upsert: true }
        );

        res.json({ success: true, score });
      } else {
        res.status(500).json({ success: false, message: "Error getting score" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Port 
const PORT=process.env.PORT||5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);


})

























