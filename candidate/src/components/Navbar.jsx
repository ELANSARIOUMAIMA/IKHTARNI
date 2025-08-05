import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {
  const { openSignIn } = useClerk()
  const {user}=useUser()
  const navigate=useNavigate()
  const {setShowRecuiterLogin}=useContext(AppContext)
  return (
    <div className='shadow py-4'>
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img  onClick={()=>navigate('/')}src={assets.logo} alt="" className=" w-1/4 cursor-pointer" />
        {
          user
          ?<div className="flex items-center gap-4">
            <Link to={'/applications'}>Applied Jobs</Link>
            <p className="">|</p>
            <p className="max-sm:hidden">Welcome, {user.firstName+" "+user.lastName}</p>
            <UserButton/>
          </div>
          :<div className="flex gap-4 max-sm:text-xs">
            <button  onClick={e=>setShowRecuiterLogin(true)} className='text-gray-600'>Recuiter Login</button>
            <button onClick={e => openSignIn()} className='bg-[#FFD700] rounded-full px-6 py-2 sm:px-9'>Login</button>
           </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar