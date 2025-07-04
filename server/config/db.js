import mongoose from 'mongoose';

//Function to connect to Mongo db database
const connectDB = async () =>{

    mongoose.connection.on('connected',()=>console.log('database connected'))

    mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}
 
export default connectDB;