import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
  const navigate=useNavigate()
  return (
    <div className='border p-6 shadow rounded'>
        <div className="flex justify-between items-center">
            <img src={assets.company_icon} alt="" className="h-8" />
        </div>
        <h4 className="font-medium text-xl  mt-2">{job.title}</h4>
        <div className="flex items-center gap-3 mt-2 text-xs">
            <span className='bg-yellow-600 border border-yellow-900 px-4 py-1.5 rounded'>{job.location}</span>
            <span className='bg-yellow-400 border border-yellow-800 px-4 py-1.5 rounded'>{job.level}</span>

        </div>
        <p dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}  className="text-gray-500 text-sm mt-4"></p>
        <div className="mt-4 flex gap-4 text-sm ">
            <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className='bg-green-500 px-4 py-2 rounded text-white border-2 border-yellow-600'>Apply now</button>
            <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className=' border border-gray-400 text-gray-500 shadow px-4 py-2 rounded'>Learn more</button>
        </div>
        

    </div>
    
  )
}

export default JobCard