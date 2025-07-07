import Job from "../models/Job.js"


//get all jobs
export const getJobs = async (req, resp) =>{
     try {
        
        const jobs = await Job.find({visible:true})
        .populate({path:'company',select:"-password"})
        
        resp.json({success:true, jobs})

     } catch (error) {
        resp.json({success:false, message:error.message})
     }
}

//get a single job by ID
export const getJobById = async (req, resp) =>{

}
