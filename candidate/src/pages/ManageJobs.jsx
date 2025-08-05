import React from 'react'
import { assets, manageJobsData } from '../assets/assets'
import moment from'moment'
import {  useNavigate } from 'react-router-dom'

const ManageJobs = () => {
  const navigate=useNavigate()
  return (
    <div className='container p-4 max-w-5xl  '>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm ">
          <thead className="">
            <th className="border-b py-2 px-4  text-left max-sm:hidden">#</th>
            <th className="border-b py-2 px-4  text-left">Job title</th>
            <th className="border-b py-2 px-4  text-left  max-sm:hidden">Date</th>
            <th className="border-b py-2 px-4  text-left  max-sm:hidden">Location</th>
            <th className="border-b py-2 px-4  text-center">Applicants</th>
            <th className="border-b py-2 px-4  text-left">Visible</th>
          </thead>
          <tbody className="">
            {manageJobsData.map((job,index)=>(
              <tr  key={index}className="text-gray-700">
                <td className=" px-4 py-2 border-b text-left max-sm:hidden ">{index+1}</td>
                <td className=" px-4 py-2 border-b text-left">{job.title}</td>
                <td className=" px-4 py-2 border-b max-sm:hidden">{ moment(job.date).format('ll')}</td>
                <td className=" px-4 py-2 border-b max-sm:hidden">{job.location}</td>
                <td className=" px-4 py-2 border-b text-center">{job.applicants}</td>
                <td className=" px-4 py-2 border-b text-left">
                  <input type="checkbox" className="scale-125 ml-4" />
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