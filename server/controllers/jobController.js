import Job from "../models/Job.js"


//get all jobs
export const getJobs = async (req, resp) =>{
     try {
        
        const jobs = await Job.find({visible:true})
        .populate({path:'companyId',select:"-password"})
        
        resp.json({success:true, jobs})

         if(!jobs){
            return resp.json({success:false, message:"jobs not found"})
        }

     } catch (error) {
        resp.json({success:false, message:error.message})
     }
}

//get a single job by ID
export const getJobById = async (req, resp) =>{
    try {

        const {id} = req.params

        const job = await Job.findById(id)
        .populate({path:"companyId",select:"-password"})

        resp.json({success:true, job})

        if(!job){
            return resp.json({success:false, message:"job not found"})
        }

    } catch (error) {
        resp.json({success:false,message:"error.message"})
    }
}
