import React from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loading from '../components/Loading.jsx'
import { useContext } from 'react'



const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  // Function to fetch comapny Job Applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )
      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  // Function to update job applications Status
  const changeJobApplicationStatus = async (id, status) => {
    // call the api
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )
      if (data.success) {
        fetchCompanyJobApplications()
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // we have to call this function from this page
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  return applicants ? applicants.lenght === 0 ?
    (
       <div className='flex items-center justify-center h-[70vh] '>
        <p className="text-xl sm:text-2xl">No applications Available</p>
      </div>
    )
    : (
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
              {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                <tr key={index} className="text-gray-700">

                  <td className="px-4 py-2  border-b text-center">{index + 1}</td>

                  <td className=" px- py-2 border-b text-center flex items-center ">
                    <img src={applicant.userId.image} alt="" className="w-10 h-10 rounded-full mr-3 max-sm:hidden" />
                    <span className=" mr-8">{applicant.userId.name}</span>
                  </td>

                  <td className="px-4 py-2 border-b max-sm:hidden">{applicant.jobId.title}</td>
                  <td className="px-4 py-2 border-b max-sm:hidden">{applicant.jobId.location}</td>
                  <td className="px-4 py-2 border-b ">
                    <a href={applicant.userId.resume} target='_blank' className="bg-yellow-50 text-yellow-400 px-3 py-1 rounded inline-flex gap-2 items-center ">
                      Resume <img src={assets.resume_download_icon} alt="" className="" />
                    </a>
                  </td>

                  <td className="px-4 py-2 border-b relative">
                    {applicant.status === "Pending"
                      ?
                      <div className="relative inline-block text-left group">
                        <button className='text-gray-500 action-button'>...</button>
                        <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg bg-white border border-gray-200 rounded shadow group-hover:block">
                          <button onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')} className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                          <button onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')} className='block w-full text-left py-2 px-4 text-red-500 hover:bg-gray-100'>Reject</button>

                        </div>
                      </div>
                      :
                      <div className="">{applicant.status}</div>
                    }

                  </td>
                </tr>

              ))}

            </tbody>
          </table>
        </div>

      </div>
    ) :
    <Loading />
}

export default ViewApplications