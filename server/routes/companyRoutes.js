import express from "express";
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplication, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";

const router = express.Router();

//register a comapany
router.post("/register", upload.single('image'), registerCompany)

//company login
router.post("/comapny",loginCompany)

//get company data
router.get("/company",getCompanyData)

//post a job
router.post("/post-job",postJob)

//get Applicant data of company
router.get("/application",getCompanyJobApplication)

//get company job list 
router.get("/list-jobs",getCompanyPostedJobs)

//change application status
router.post("/change-status",changeJobApplicationStatus)

//change application visibility
router.post("/change-visibility",changeJobVisibility)

export default router;