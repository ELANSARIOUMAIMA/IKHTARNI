import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import kconvert from 'k-convert';
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'

const ApplyJobs = () => {
  const { id } = useParams()

  const { getToken } = useAuth()

  const navigate = useNavigate()

  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied,setIsAlreadyApplied]=useState(false)

  const { jobs, backendUrl, userData, userApplications,fetchUserApplications } = useContext(AppContext)

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
      if (data.success) {
        setJobData(data.job)

      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for jobs')
      }
      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply ')
      }
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }

  }
  
  const checkAlreadyApplied=()=>{
    // here we will check the user has already applied for this job or not
    const hasApplied=userApplications.some(item=>item.jobId._id===JobData._id)
    setIsAlreadyApplied(hasApplied)

  }


  useEffect(() => {
    fetchJob()
  }, [id])
  useEffect(() => {
    if (userApplications.length>0 && JobData ) {
      checkAlreadyApplied()
    }
  }, [JobData,userApplications,id])


  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className=" bg-white text-black rounded-lg w-full">

          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-yellow-50 border border-yellow-400 rounded-xl">
            <div className=" flex flex-col md:flex-row  items-center">
              <img src={JobData.companyId.image} alt="" className="h-24 w-24 bg-white rounded-full  mr-4 max-md:mb-4 border" />
              <div className=" text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{JobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2 ">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" className="" />
                    {JobData.companyId.name}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" className="" />
                    {JobData.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" className="" />
                    {JobData.level}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" className="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-5 text-end text-sm max-md:mx-auto max-md:text-center ">
              <button onClick={applyHandler} className="bg-yellow-700 p-2.5 px-10 text-white rounded-full">{isAlreadyApplied?"Already Applied":"Apply Now"}</button>
              <p className="border border-yellow-700 p-2.5 px-10 rounded-full text-gray-600">Posted {moment(JobData.date).fromNow()}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start">
            {/* left Section*/}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4 lg:mt-0">Job description</h2>
              <div dangerouslySetInnerHTML={{ __html: JobData.description }} className="rich-text"></div>
              <button onClick={applyHandler} className='bg-yellow-700 p-2.5 px-10 mt-10 text-white rounded-full'>{isAlreadyApplied?"Already Applied":"Apply Now"}</button>
            </div>
            {/* right Section More Jobs*/}
            <div className="w-full lg:w-1/3 lg:mt-8 lg:ml-8 space-y-5">
              <h2 className="">More jobs from {JobData.companyId.name}</h2>
              {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                .filter(job => {
                  // set of applied jobIds
                  const appliedJobsIds=new Set(userApplications.map(app=>app.jobId && app.jobId._id))
                  // Return true if the user has not already applied for this job
                  return !appliedJobsIds.has(job._id)
                }).slice(0, 4)
                .map((job, index) => <JobCard key={index} job={job} />)}
            </div>


          </div>

        </div>

      </div>
      <Footer />

    </>
  )

    : (<Loading />)


}


export default ApplyJobs