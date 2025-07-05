import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req,resp,next) => {
     
    const token = req.header.token

    if(!token){
        return resp.json({success:false, message:"Not Authorised, login again"})
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.company = await Company.findById(decoded.id).select('-password')
    
    } catch (error) {
        resp.json({success:false,message:error.message})
    }
}