import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets, jobsData } from '../assets/assets'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import kconvert from 'k-convert';
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'

const ApplyJobs = () => {
  const { id } = useParams()
  const [JobData, setJobData] = useState(null)

  const { jobs } = useContext(AppContext)

  const fetchJob = async () => {
    const data = jobs.filter(job => job._id === id)
    if (data.length !== 0) {
      setJobData(data[0])
      console.log(data[0])
    }

  }
  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob()
    }

  }, [id, jobs])
  return JobData ? (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
      <div className=" bg-white text-black rounded-lg w-full">

        <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-yellow-50 border border-yellow-400 rounded-xl">
          <div className=" flex flex-col md:flex-row  items-center">
            <img src={JobData.companyId.image} alt="" className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border" />
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
            <button className="bg-yellow-700 p-2.5 px-10 text-white rounded-full">Apply Now</button>
            <p className="border border-yellow-700 p-2.5 px-10 rounded-full text-gray-600">Posted {moment(JobData.date).fromNow()}</p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* left Section*/}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold mb-4 lg:mt-0">Job description</h2>
            <div dangerouslySetInnerHTML={{__html:JobData.description}} className="rich-text"></div>
            <button className='bg-yellow-700 p-2.5 px-10 mt-10 text-white rounded-full'>Apply Now</button>
          </div>
          {/* right Section More Jobs*/}
          <div className="w-full lg:w-1/3 lg:mt-8 lg:ml-8 space-y-5">
            <h2 className="">More jobs from {JobData.companyId.name}</h2>
            {jobs.filter(job=>job._id!==JobData._id && job.companyId._id===JobData.companyId._id)
            .filter(job=>true).slice(0,2)
            .map((job,index)=><JobCard key={index} job={job} />)}
          </div>


        </div>

      </div>

    </div>
    <Footer/>

    </>
  )
  :(
    <Loading/>
    
  )
}

export default ApplyJobs