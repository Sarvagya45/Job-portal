import express from "express";
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplication, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//register a comapany
router.post("/register", upload.single('image'), registerCompany)

//company login
router.post("/login",loginCompany)

//get company data
router.get("/company", protectCompany, getCompanyData)

//post a job
router.post("/post-job", protectCompany, postJob)

//get Applicant data of company
router.get("/application", protectCompany, getCompanyJobApplication)

//get company job list 
router.get("/list-jobs",protectCompany, getCompanyPostedJobs)

//change application status
router.post("/change-status", protectCompany, changeJobApplicationStatus)

//change application visibility
router.post("/change-visibility", protectCompany, changeJobVisibility)

export default router;