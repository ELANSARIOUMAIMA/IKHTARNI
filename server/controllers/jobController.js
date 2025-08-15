//import { User } from "@clerk/express"
import Job from "../models/job.js"
//import User from '../models/User.js'  
import JobAplication from "../models/JobApplication.js"



// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true })
      .populate({ path: 'companyId', select: "-password" })
    res.json({ success: true, jobs })


  } catch (error) {
    res.json({ success: false, message: error.message })

  }

}

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findById(id)
      .populate({
        path: 'companyId',
        select: "-password"
      })
    if (!job) {
      return res.json({ success: false, message: "Job not found" })
    }

    res.json({ success: true, job })


  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}



// Get a job description by ID
export const getJobDescription = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select('description')
    if (!job) {
      return res.json({ success: false, message: 'Job not found' })
    }
    
    res.json({ success: true, jobDescription: job.description })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}



// get job resumes
export const getJobResumes = async (req, res) => {
  try {
    const { jobId } = req.params


    const applicationsResumes = await JobAplication.find({ jobId })
      .populate('userId', 'name resume') 

    if (!applicationsResumes) {
      return res.json({ success: false, message: 'No applications found for this job' })
    }

   
    res.json({ success: true, applicationsResumes })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}



