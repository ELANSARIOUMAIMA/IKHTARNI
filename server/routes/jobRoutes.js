import express from 'express'
import { getJobById, getJobDescription, getJobResumes, getJobs } from '../controllers/jobController.js'

const router =express.Router()

// Route to get all jobs data
router.get('/',getJobs)


// Route to get a single job by ID
router.get('/:id',getJobById)
// Route to get a job description by ID
router.get('/:id/description', getJobDescription)

router.get('/:jobId/resumes',getJobResumes )

export default router