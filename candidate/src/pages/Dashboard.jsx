import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ListChecks } from "lucide-react";


import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'


const Dashboard = () => {

  const navigate = useNavigate()
  const { companyData,setCompanyData,setCompanyToken } = useContext(AppContext)

  // Function to logout for company
  const logout=()=>{
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  useEffect(()=>{
    if(companyData){
      navigate('/dashboard/manage-jobs')
    }
  },[companyData])
  return (
    <div className='min-h-screen'>
      {/*  Navbar for recuriter panel*/}
      <div className="shadow py-4">
        <div className="flex  px-5 justify-between items-center">
          <img onClick={() => navigate('/')} src={assets.logo} alt="" className="w-1/4 cursor-pointer" />
          {
            companyData && (
              <div className="flex items-center gap-3">
                <p className="max-sm:hidden">Welcome, {companyData.name}</p>
                <div className="relative  group">
                  <img src={companyData.image} alt="" className="w-8 border rounded-full" />
                  <div className=" absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                    <ul className="list-none m-0 p-2 bg-white rounded-md  border  text-sm">
                      <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>

                    </ul>
                  </div>
                </div>

              </div>

            )
          }

        </div>

      </div>

      <div className="flex items-start">

        {/* left Sidebar with option to add job , manage job view applications */}
        <div className="inline-block min-h-screen border-r-2 ">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-yellow-100 border-r-4 border-yellow-500'}`} to={'/dashboard/add-job'}>
              <img src={assets.add_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-yellow-100 border-r-4 border-yellow-500'}`} to={'/dashboard/manage-jobs'}>
              <img src={assets.home_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">Manage Job</p>
            </NavLink>

            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-yellow-100 border-r-4 border-yellow-500'}`} to={'/dashboard/view-applications'}>
              <img src={assets.person_tick_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>

          </ul>
        </div>

        {/* right Sidebar */}

        <div className="flex-1 h-full p-2 sm:p-5"><Outlet /></div>
      </div>

    </div>
  )
}

export default Dashboard