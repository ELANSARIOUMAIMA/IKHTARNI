import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import cors from 'cors';
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
import os from 'os';
import dotenv from 'dotenv';




 


dotenv.config({ path: path.resolve('./server/.env') }); // chemin vers ton .env




// ES Modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());


await connectDB();
await connectCloudinary();

app.use(express.json({ extended: true }));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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



app.get('/', (req, res) => {
  res.send("Second API of score Working 🚀");
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});