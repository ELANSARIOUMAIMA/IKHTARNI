import express from 'express'
import { ChangeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyControllers.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'


const router =express.Router()

// Register a Company
router.post('/register',upload.single('image'),registerCompany)

// Company login
router.post('/login',loginCompany)

// Get Company Data
router.get('/company',protectCompany,getCompanyData)

// Post a new Job
router.post('/post-job',protectCompany,postJob)

// Get Company Job Appliccans
router.get('/applicants',protectCompany,getCompanyJobApplicants)

// Get Comapny Posted Jobs
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

// Change Job Appliction Status
router.post('/change-status',protectCompany,ChangeJobApplicationsStatus)

// change job visibility
router.post('/change-visibility',protectCompany,changeVisibility)

export default router