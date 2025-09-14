// controllers/scoreController.js
import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

import User from "../models/User.js";
import Job from "../models/job.js";
import JobApplication from "../models/JobApplication.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postScore = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const job = await Job.findById(jobId);
    const user = await User.findOne({ _id: userId });

    if (!user || !user.resume)
      return res.status(400).json({ error: "No resume URL" });

    // Download resume from Cloudinary
    const response = await fetch(user.resume);
    const buffer = await response.arrayBuffer();
    const tmpPath = path.join(__dirname, "../temp_resume.pdf");
    fs.writeFileSync(tmpPath, Buffer.from(buffer));

    // Call Python script
    const scriptPath = path.join(__dirname, "../resume_matcher/resume_score.py");
    

    // IMPORTANT: in Docker, use "python3" instead of hardcoding venv
    const pythonProcess = spawn("python3", [scriptPath, tmpPath, job.description]);
    

    let score = "0";
    pythonProcess.stdout.on("data", (data) => (score += data.toString()));
    pythonProcess.stderr.on("data", (data) =>
      console.error("Python error:", data.toString())
    );

    pythonProcess.on("close", async (code) => {
      fs.unlinkSync(tmpPath);

      if (code === 0) {
        score = parseFloat(score);

        await JobApplication.findOneAndUpdate(
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
};
