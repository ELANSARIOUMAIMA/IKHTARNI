import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'


const ViewApplications = () => {
  
  return (
    <div className='container mx-auto p-4'>
      <div className="">
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
          <thead className="">
            <tr className="border-b">
              <th className="py-2 text-left px-4">#</th>
              <th className="py-2 text-left px-4">User name</th>
              <th className="py-2 text-left px-4  max-sm:hidden">Job Title</th>
              <th className="py-2 text-left px-4 max-sm:hidden">Location</th>
              <th className="py-2 text-left px-4">Resume</th>
              <th className="py-2 text-left px-4">Action</th>
            </tr>

          </thead>
          <tbody className="">
            {viewApplicationsPageData.map((applicant,index)=>(
              <tr  key={index} className="text-gray-700">

                <td className="px-4 py-2  border-b text-center">{index+1}</td>

                <td className=" px-4 py-2 border-b text-center flex ">
                   <img src={applicant.imgSrc} alt="" className="w-10 h-10 rounded-full mr-3 max-sm:hidden" />
                <span className="">{applicant.name}</span>
                </td>

                <td className="px-4 py-2 border-b max-sm:hidden">{applicant.jobTitle}</td>
                <td className="px-4 py-2 border-b max-sm:hidden">{applicant.location}</td>
                <td className="px-4 py-2 border-b text-center">
                  <a href="" target='_blank' className="bg-yellow-50 text-yellow-400 px-3 py-1 rounded inline-flex gap-2 items-center ">
                    Resume <img src={assets.resume_download_icon} alt="" className="" />
                  </a>
                </td>
                <td className="px-4 py-2 border-b relative">
                 <div className="relative inline-block text-left group">
                  <button className='text-gray-500 action-button'>...</button>
                  <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg bg-white border border-gray-200 rounded shadow group-hover:block">
                    <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                    <button className='block w-full text-left py-2 px-4 text-red-500 hover:bg-gray-100'>Reject</button>

                  </div>
                 </div>
                </td>
              </tr>

            ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ViewApplications