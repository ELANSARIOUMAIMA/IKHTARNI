import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
const Applications = () => {
  const [isEdit,setIsEdit]=useState(false)
  const[resume,setResume] =useState(null)
  return (
    <>
    <Navbar/>
    <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
      <h2 className="font-semibold text-xl">Your Resume</h2>
      <div className="flex gap-5 mb-6  mt-3 ">
        {
          isEdit 
          ? <>
          <label htmlFor="resumeUpload" className="flex items-center">
            <p className=" bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg mr-4 ">Seldect Resume</p>
            <input id='resumeUpload'onChange={e=>setResume(e.target.files[0])} type="file" className="" hidden accept='application/pdf'/>
            <img src={assets.profile_upload_icon} alt="" className="" />
          </label>
          <button  onClick={e=>setIsEdit(false)}className='bg-green-100  px-4 py-2 border border-green-400 rounded-lg'>Save</button>
          </>
          : <div className="flex gap-2 ">
            <a href="" className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg">Resume</a>
            <button  onClick={()=>setIsEdit(true)} className="text-gray-500 border border-gray-300 px-4 py-2 rounded-lg">Edit</button>
          </div>


        }
      </div>
      <h2 className="font-semibold text-xl mb-4">Jobs Applied</h2>
      <table className="min-w-full bg-white border rounded-lg">

        <thead>
          <tr className="">
            <th className='py-3 px-4 text-left border-b'>Company</th>
            <th className='py-3 px-4 text-left border-b'>Job Title</th>
            <th className='py-3 px-4 text-left border-b max-sm:hidden'>Location</th>
            <th className='py-3 px-4 text-left border-b max-sm:hidden'>Date</th>
            <th className='py-3 px-4 text-left border-b'>Status</th>
          </tr>
        </thead>

        <tbody>
          {jobsApplied.map((job,index)=>true
           ?(
            <tr className="">
              <td className='flex py-3 px-4 items-center gap-2 border-b'>
                <img src={job.logo} alt="" className="w-8 h-8" />
                {job.company}
              </td>
              <td className='py-2 px-4 border-b '>{job.title}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
              <td className='py-2 px-4 border-b '>
                <span className={`${job.status==='Accepted'? 'bg-green-200':job.status==='Rejected'?'bg-red-200':'bg-blue-200'} px-4 py-1.5 rounded`}>
                {job.status}
                </span>
                </td>
            </tr>
           )
           :(null)
           )}

        </tbody>
        
      </table>
      
    </div>
    <Footer/>
    </>
  )
}

export default Applications