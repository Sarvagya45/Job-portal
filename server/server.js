import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize Express
const app = express()

//connect to database
await connectDB()

//Middleware
app.use(cors())
app.use(express.json())

// Route
app.get('/', (req,resp)=>{
    resp.send("API working")
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks",clerkWebhooks)


//Port 
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})