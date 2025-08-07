// we will use the middleware to get the company ID
// we will use the token of the login to authenticate the company and to fetch the company
import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'
export const  protectCompany=async(req,res,next)=>{

    const token=req.headers.token

    if (!token) {//if we don't have any token
       return res.json({success:false,message:'Not authorized,Login Again'})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.company=await Company.findById(decoded.id).select('-password')
        next()
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}