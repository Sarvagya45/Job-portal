import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller Function to manage clerk user with database
export const clerkWebhooks = async (req,resp) => {
    try {
        console.log('Webhook received:', req.body?.type);
        
        //Create a svix instance with clerk webhook secret 
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        //verifying header 
        await whook.verify (JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        //getting data from request body
        const { data , type } = req.body 

        //switch cases for diffrent events
        switch(type){

            case 'user.created':{

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                console.log('Creating user:', userData);
                const newUser = await User.create(userData)
                console.log('User created successfully:', newUser._id);
                resp.json({success: true})
                break;
            }

            case 'user.updated':{
                
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                console.log('Updating user:', data.id, userData);
                await User.findByIdAndUpdate(data.id,userData)
                console.log('User updated successfully');
                resp.json({success: true})
                break;
            }

            case 'user.deleted':{
                console.log('Deleting user:', data.id);
                await User.findByIdAndDelete(data.id)
                console.log('User deleted successfully');
                resp.json({success: true})
                break;
            }

            default:{
                break;
            }
        } 

    } catch (error) {
        console.error('Webhook Error Details:');
        console.error('- Error message:', error.message);
        console.error('- Error stack:', error.stack);
        console.error('- Request body:', JSON.stringify(req.body, null, 2));
        console.error('- Request headers:', req.headers);
        
        resp.status(500).json({
            success: false,
            message: "Webhook processing error",
            error: error.message
        })
    }
}