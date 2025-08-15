import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const AddJobs = () => {
  const[title,setTitle]=useState('')
  const[location,setLocation]=useState('Casablanca')
  const[category,setCategory]=useState('Programming')
  const[level,setLevel]=useState('Beginner level')
  const[salary,setSalary]=useState(0)


  const editorRef=useRef(null)
  const quillRef=useRef(null)

  const {backendUrl,companyToken}=useContext(AppContext)


  const onSubmitHandler =async(e)=>{
    e.preventDefault()
    try {
      const description =quillRef.current.root.innerHTML

      const {data}= await axios.post(backendUrl+'/api/company/post-job',
        {title,description,location,salary,category,level},
        {headers:{token:companyToken}}
      )
      if (data.success) {
        toast.success(data.message)
        setTitle('')
        setSalary(0)
        quillRef.current.root.innerHTML=""
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
       toast.error(error.message)
    }
  }

  useEffect(()=>{
    // Initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current=new Quill(editorRef.current,{
        theme:'snow',
      })
    }
  },[])
  {/*get the support of reach text we must to install quill*/ }
  return (
  
      
      <form onSubmit={onSubmitHandler} className="container flex flex-col w-full p-4  items-start gap-3">
        <div className="w-full">
          <p className="mb-2">Job Title</p>
          <input type="text" placeholder='Type here' className=" w-full max-w-lg px-3 py-2 border-2 border-gray-300 outline-none rounded"  onChange={e=>setTitle(e.target.value)} value={title} required/>
        </div>

        <div className="w-full max-w-lg ">
          <p className="my-2">Job Description</p>
          <div  className="border-2" ref={editorRef}>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8 ">

          <div className="">
            <p className="mb-2">Job Category</p>
            <select onChange={e=>setCategory(e.target.value)}  className="w-full px-3 py-2  rounded border-2 border-gray-300">
              {
              JobCategories.map((category,index)=>(
                <option key={index} value={category} className="">{category}</option>
              ))
            }
            </select>
          </div>

          <div className="">
          <p className="mb-2">Job Location</p>
          <select onChange={e=>setLocation(e.target.value)} className='w-full px-3 py-2  rounded border-2 border-gray-300' >
            {
              JobLocations.map((location,index)=>(
                <option  key={index}value={location} className="">{location}</option>
              ))
            }
          </select>
        </div>

        <div className="">
          <p className="mb-2">Job Level</p>
          <select onChange={e=>setLevel(e.target.value)} className="w-full px-3 py-2  rounded border-2 border-gray-300">
            <option value="Beginner level" className="">Beginner level</option>
            <option value="Intermediate level" className="">Intermediate level</option>
            <option value="Senior level" className="">Senior level</option>
            
            
          </select>
        </div>
          
        </div>
        <div className="">
          <p className="mb-2"> Job Salary</p>
          <input min={0} type="number" placeholder="2500" onChange={e=>setSalary(e.target.value)} className='w-full px-3 py-2  rounded border-2 border-gray-300 sm:w-[120px]' />

        </div>
        <button className=' w-28  mt-4   px-4 py-2 border border-yellow-800 bg-yellow-200 rounded-full text-yellow-800 '>ADD</button>


      </form>
  
  )
}

export default AddJobs