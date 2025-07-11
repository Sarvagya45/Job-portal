import Job from "../models/Job.js"
import Company from "../models/Company.js"

//get all jobs
export const getJobs = async (req, resp) =>{
     try {
        
        const jobs = await Job.find({visible:true})
        .populate({path:'companyId',select:"-password"})
        
        if(!jobs){
            return resp.json({success:false, message:"jobs not found"})
        }

        resp.json({success:true, jobs})

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

        if(!job){
            return resp.json({success:false, message:"job not found"})
        }
                
        resp.json({success:true, job})

    } catch (error) {
        resp.json({success:false,message:"error.message"})
    }
}

// Create a new job
export const createJob = async (req, resp) => {
    try {
        const { title, description, location, category, level, salary } = req.body

        // Basic validation
        if (!title || !description || !location || !category || !level || !salary) {
            return resp.json({ success: false, message: "All fields are required" })
        }

        // Check if there's a default company, if not create one
        let defaultCompany = await Company.findOne({})
        
        if (!defaultCompany) {
            defaultCompany = new Company({
                name: "Default Company",
                email: "default@company.com", 
                image: "default-image-url",
                password: "defaultpassword123"
            })
            await defaultCompany.save()
        }

        const newJob = new Job({
            title,
            description,
            location,
            category,
            level,
            salary: Number(salary),
            companyId: defaultCompany._id
        })

        await newJob.save()

        resp.json({ success: true, message: "Job created successfully", job: newJob })

    } catch (error) {
        resp.json({ success: false, message: error.message })
    }
}
