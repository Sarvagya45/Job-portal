import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

//register a new company
export const registerCompany = async (req, resp) => {

    const { name, email, password } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return resp.json({ success: false, message: "Missing Details" })
    }

    try {

        const companyExist = await Company.findOne({ email })

        if (companyExist) {
            return resp.json({ success: false, message: "company already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        resp.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })
    } catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

//company login 
export const loginCompany = async (req, resp) => {
    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ email })

        if (bcrypt.compare(password, company.password)) {
            resp.json({
                success: true,
                message: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else{
            resp.json({success:false , message:"invalid email or password"})
        }
    } catch (error) {
        resp.json({success: false , mmessage: error.message})
    }
}

//get company data 
export const getCompanyData = async (req, resp) => {

}

//post a new job
export const postJob = async (req, resp) => {

    const {title, description, location, salary, date, level, category} = req.body

    const companyId = req.company._id

    try {

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date:date.now,
            level,
            category
        })

        await newJob.save()
        
        resp.json({success:true, newJob})

    } catch (error) {
        resp.json({success:false, message:error.message})
    }
}

//get company job Application
export const getCompanyJobApplication = async (req, resp) => {

}

//get company posted job 
export const getCompanyPostedJobs = async (req, resp) => {

}

//change Job application status
export const changeJobApplicationStatus = async (req, resp) => {

}

//change Job visibilty
export const changeJobVisibility = async (req, resp) => {

}