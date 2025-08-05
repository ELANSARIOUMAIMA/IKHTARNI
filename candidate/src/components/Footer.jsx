import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='  container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
        <img  width={160}src={assets.logo} alt="" className="" />
        <p className=" flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @ElansariServices.IKHTARNI | All right reserved. </p>
        <div className=" flex gap-2.5 ">
          <a href="https://www.linkedin.com/in/oumaima-el-ansari-921068334" className="" target="_blank"><img width={38} src={assets.linkedin_icon} alt=""  /></a> 
          <a href="https://www.instagram.com/oumaimaservices" className="" target='_blank'><img width={38} src={assets.instagram_icon} alt=""  /></a>
          <a href="https://github.com/ELANSARIOUMAIMA" className="" target='_blank'><img width={38} src={assets.github_icon} alt=""  /></a>
          
        </div>
    </div>
  )
}

export default Footer