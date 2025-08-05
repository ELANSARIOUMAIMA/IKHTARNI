import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext.jsx'

const Hero = () => {
    const {setSearchFilter,setIsSearched}=useContext(AppContext)
    const titleRef=useRef(null)
    const locationRef=useRef(null)

    const onSearch=()=>{
        setSearchFilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        })
        setIsSearched(true)
    }
    
  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
        <div className="bg-gradient-to-r from-[#FFD700] to-[#FFB400] py-16 text-center mx-2 rounded-xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-3 ">Over 500+jobs to apply</h2>
            <p className="mb-8  max-w-xl mx-auto text-sm font-light px-5"> Ready for your next big move? Explore top job openings and take the first step toward a brighter future today.</p>
            <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
                <div className="flex items-center  ">
                    <img src={assets.search_icon} alt="" className="h-4 sm:h-5" />
                    <input type="text"  placeholder="Search for jobs"className="max-sm:text-xs p-2 rounded outline-none w-full" ref={titleRef} />

                </div>
                <div className="flex items-center ">
                    <img src={assets.location_icon} alt="" className="h-4 sm:h-5" />
                    <input type="text"  placeholder="Location"className="max-sm:text-xs p-2 rounded outline-none w-full" ref={locationRef} />

                </div>
                <button onClick={onSearch} className="bg-[#FFB400] text-white py-2 px-6 rounded m-1">Search</button>
            </div>

        </div>

     

        <div className="border border-gray-200 mx-2 mt-5 p-6 shadow-md rounded-md">
            <div className="text-center mb-4">
                <p className="font-medium text-gray-700 text-sm sm:text-base">Trusted by</p>
            </div>
            <div className="flex justify-center items-center gap-6 sm:gap-10 flex-wrap">
                <img src={assets.bcgx_logo} alt="BCGX" className="w-20 h-10 sm:h-12 object-contain transition" />
                <img src={assets.leyton_logo} alt="Leyton" className=" w-20 h-10 sm:h-12 object-contain  transition" />
                <img src={assets.ibm_logo} alt="IBM" className=" w-20 h-10 sm:h-12 object-contain  transition" />
                <img src={assets.oracle_logo} alt="Oracle" className="w-20 h-10 sm:h-12 object-contain transition" />
                <img src={assets.deloite_logo} alt="Deloitte" className=" w-20 h-10 sm:h-12 object-contain transition" />
                
            </div>
        </div>

    </div>
  )
}

export default Hero