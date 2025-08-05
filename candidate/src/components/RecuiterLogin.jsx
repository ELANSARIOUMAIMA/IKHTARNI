import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'

const RecuiterLogin = () => {
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const [image, setImage] = useState(false)

    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)
    const {setShowRecuiterLogin}=useContext(AppContext)

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        if(state=='Sign Up' && !isTextDataSubmited){
            setIsTextDataSubmited(true)
        }
    }
    
    useEffect(()=>{
        document.body.style.overflow='hidden'
        return()=>{
             document.body.style.overflow='unset'
        }

    },[])
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} action="" className="relative bg-white p-10 rounded-xl text-slate-500">
                <h1 className="text-center text-2xl text-neutral-700 font-medium">Recuiter {state}</h1>
                <p className="text-sm ">Welcome back! Please sign in to continue</p>
                {
                    state === "Sign Up" && isTextDataSubmited
                        ? <>
                        <div className="flex items-center gap-4 my-10">
                            <label htmlFor="image">
                                <img src={ image? URL.createObjectURL(image):assets.upload_area} alt="" className="w-16 rounded-full" />
                                <input onChange={e=> setImage(e.target.files[0])} value={image} type="file" id="image" hidden/>  

                            </label>
                            <p className="">Upload Company <br className="" />logo </p>
                            
                        </div>
                        </>
                        :
                        <>
                            {
                                state !== 'Login' &&
                                <div className="flex border px-4 py-2 gap-2 items-center rounded-full mt-5 ">
                                    <img src={assets.person_icon} alt="" className="" />
                                    <input onChange={e => setName(e.target.value)} type="text" className="outline-none text-sm" placeholder='Company Name' value={name} required />
                                </div>
                            }



                            <div className="flex border px-4 py-2 items-center rounded-full mt-5 gap-2">
                                <img src={assets.email_icon} alt="" className="" />
                                <input onChange={e => setName(e.target.value)} type="email" className="outline-none text-sm" placeholder='Email Id' value={email} required />
                            </div>

                            <div className="flex border px-4 py-2 items-center rounded-full mt-5 gap-2">
                                <img src={assets.lock_icon} alt="" className="outline-none text-sm" />
                                <input onChange={e => setName(e.target.value)} type="password" className="outline-none text-sm" placeholder='Password' value={password} required />
                            </div>
                        </>
                }

                {state==='Login'&& <p className="text-sm underline text-yellow-600 my-4 cursor-pointer  ">Forgot password? </p>}
                <button type='submit' className=" bg-yellow-600 w-full text-white mt-4 py-2 px-6  rounded-full ">
                    {state === 'Login' ? 'Login' : isTextDataSubmited ? 'create account':'next'}
                </button>
                {
                    state === 'Login'
                        ? <p className=" mt-5 text-center">Don't have an account? <span className='text-yellow-600 underline cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                        : <p className=" mt-5 text-center">Already have an account? <span className='text-yellow-600 underline cursor-pointer' onClick={() => setState('Login')}  >Login</span></p>
                }
                <img  onClick={e=>setShowRecuiterLogin(false)}src={assets.cross_icon} alt="" className=" absolute top-5 right-5  cursor-pointer " />
            </form>


        </div>
    )
}

export default RecuiterLogin