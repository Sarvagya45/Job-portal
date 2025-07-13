import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import Job from "../models/Job.js"
import { v2 as cloudinary } from "cloudinary";

//get user data
export const getUserData = async (req, resp) => {

    const userId = req.auth.userId

    try {

        const user = await User.findById(userId)

        if (!user) {
            resp.send({ success: false, message: "User Not Found" })
        }

        resp.json({ success: true, user })

    } catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

//Apply for job
export const applyForJob = async (req, resp) => {

    const { jobId } = req.body

    const userId = req.auth.userId

    try {

        const isAlreadyApplied = await JobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return resp.json({ success: false, message: "Already Applied" })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return resp.json({ success: false, message: "Job Not Found" })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId
        })

        resp.json({ success: true, message: "Applied Successfully" })
    } catch (error) {
        resp.json({ success: false, message: error.message })
    }

}

//get user applied application
export const getUserJobApplications = async (req, resp) => {

    try {

        const userId = req.auth.userId

        const applications = await JobApplication.find({ userId })
            .populate("companyId", "name email image")
            .populate("jobId", "title description location category level salary")
            .exec()

        if (!applications) {
            return resp.json({ success: false, message: "No job Application Found" })
        }

        return resp.json({ success: true, applications })

    } catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

//update user Profile (resume)
export const updateUserResume = async (req, resp) => {

    try {

        const userId = req.auth.userId

        const resumeFile = req.file

        const userData = await User.findById(userId)

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return resp.json({ success: true, message: "resume Uploaded" })
    
    } catch (error) {
        resp.json({success: false, message:error.message})
    }
}