import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Applications = () => {

  const {user}=useUser()
  const {getToken}=useAuth()


  const [isEdit,setIsEdit]=useState(false)
  const[resume,setResume] =useState(null)

 const {  backendUrl,userData,userApplications,fetchUserData,fetchUserApplications } = useContext(AppContext)

 const updateResume=async()=>{
  try {
    const formData=new FormData()
    formData.append('resume',resume)

    const token =await getToken()

    const {data}=await axios.post(backendUrl+'/api/users/update-resume',
      formData,
      {headers:{Authorization:`Bearer ${token}`}}
    )

    if (data.success) {
      toast.success(data.message)
      await fetchUserData()
    }
    else{toast.error(data.message)}
  } catch (error) {
    toast.error(error.message)
  }
  setIsEdit(false)
  setResume(null)

 }
 useEffect(()=>{
  if (user) {
    fetchUserApplications()
  }

 },[user])
  return (
    <>
    <Navbar/>
    <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
      <h2 className="font-semibold text-xl">Your Resume</h2>
      <div className="flex gap-5 mb-6  mt-3 ">
        {
          isEdit || userData && userData.resume === ""
          ? <>
          <label htmlFor="resumeUpload" className="flex items-center">
            <p className=" bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg mr-4 ">{resume ? resume.name:"Select Resume"}</p>
            <input id='resumeUpload'onChange={e=>setResume(e.target.files[0])} type="file" className="" hidden accept='application/pdf'/>
            <img src={assets.profile_upload_icon} alt="" className="" />
          </label>
          <button  onClick={updateResume}className='bg-green-100  px-4 py-2 border border-green-400 rounded-lg'>Save</button>
          </>
          : <div className="flex gap-2 ">
            <a  target='_blanck'href={userData.resume} className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg">Resume</a>
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
          {userApplications.map((job,index)=>true
           ?(
            <tr  key={index}className="">
              <td className='flex py-3 px-4 items-center gap-2 border-b'>
                <img src={job.companyId.image} alt="" className="w-8 h-8" />
                {job.companyId.image}
              </td>
              <td className='py-2 px-4 border-b '>{job.jobId.title}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
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