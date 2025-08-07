import React, { useContext, useEffect, useState } from 'react'
import { assets, manageJobsData } from '../assets/assets'
import moment from'moment'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const ManageJobs = () => {


  const navigate=useNavigate()

  const [jobs,setJobs]=useState([])

  const{backendUrl,companyToken}=useContext(AppContext)

  // Function to fetch company Job Applications data
  const fetchCompanyJobs=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/company/list-jobs',
        {headers:{token:companyToken}}
      )
      if (data.success) {
        setJobs(data.jobsData.reverse())//we will get the latest jobs in the first
        console.log(data.jobsData);
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to change the  Job Visibility
  const changeJobVisibility=async(id)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/company/change-visibility',
        {id},
        { headers:{token:companyToken}} 
      )
      if(data.success) {
        toast.success(data.message) 
        fetchCompanyJobs()
      }
      else{
        toast.error(data.message) 

      }
      
    } catch (error) {
      toast.error(error.message) 
      
    }

  }

  useEffect(()=>{
    if (companyToken) {
      fetchCompanyJobs()
    }
  },[companyToken])


  return (
    <div className='container p-4 max-w-5xl  '>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm ">
          <thead className="">
            <tr className="">
              <th className="border-b py-2 px-4  text-left max-sm:hidden">#</th>
              <th className="border-b py-2 px-4  text-left">Job title</th>
              <th className="border-b py-2 px-4  text-left  max-sm:hidden">Date</th>
              <th className="border-b py-2 px-4  text-left  max-sm:hidden">Location</th>
              <th className="border-b py-2 px-4  text-center">Applicants</th>
              <th className="border-b py-2 px-4  text-left">Visible</th>
              </tr>
          </thead>
          <tbody className="">
            {jobs.map((job,index)=>(
              <tr  key={index}className="text-gray-700">
                <td className=" px-4 py-2 border-b text-left max-sm:hidden ">{index+1}</td>
                <td className=" px-4 py-2 border-b text-left">{job.title}</td>
                <td className=" px-4 py-2 border-b max-sm:hidden">{ moment(job.date).format('ll')}</td>
                <td className=" px-4 py-2 border-b max-sm:hidden">{job.location}</td>
                <td className=" px-4 py-2 border-b text-center">{job.applicants}</td>
                <td className=" px-4 py-2 border-b text-left">
                  <input onChange={()=>changeJobVisibility(job._id)} type="checkbox" className="scale-125 ml-4" checked={job.visible} />
                </td>
              </tr>
            ))}
            

          </tbody>
        </table>
       
      </div>
       <div className="mt-4 flex justify-end">
        <button  onClick={()=>navigate('/dashboard/add-job')}className="px-4 py-2 border border-yellow-800 bg-yellow-200 rounded-full text-yellow-800">Add new job</button>
        </div>
       
    </div>
  )
}

export default ManageJobs