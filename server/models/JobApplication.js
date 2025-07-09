import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
    userId: {type: String, ref:'User', required:true},
    comapnyId: {type: mongoose.Schema.Types.ObjectId, ref:'Company', required:true},
    jobId: {type: mongoose.Schema.Types.ObjectId, ref:'Job', required:true},
    status: {type: String, default: "pending"},
    date: {type: Date, default:Date.now}
})

const JobApplication = mongoose.model('JobApplication',JobApplicationSchema)

export default JobApplication;