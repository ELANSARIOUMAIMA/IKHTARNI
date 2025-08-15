import mongoose from'mongoose'
const JobAplicationSchema=new mongoose.Schema({
    userId:{type:String,ref:'User',required:true},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:'Company',required:true},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true},
    status:{type:String,default:'Pending'},
    date:{type:Number,required:true},
    score:{type: Number,default:0},


})
const JobAplication=mongoose.model('JobAplication',JobAplicationSchema)
export default JobAplication