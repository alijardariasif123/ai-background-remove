import { Webhook } from "svix"
import userModel from "../models/userModel.js"
//API controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    try {
        //create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        
        const {data, type} = req.body
        switch (type) {
            case "user.created":{
                const userdata = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    phoneNo: data.phone_numbers[0].phone_number,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.create(userdata)
                res.json({})

                break;
            }
            case "user.updated":{
                const userdata = {
                    email: data.email_addresses[0].email_address,
                    phoneNo: data.phone_numbers[0].phone_number,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.findOneAndUpdate({clerkId: data.id}, userdata)
                res.json({})

                break;
            }
            case "user.deleted":{
                await userModel.findOneAndDelete({clerkId: data.id})
                res.json({})

                break;
            }               
        
            default:
                break;
        }

    } catch (error) {
        console.log(error.mesage) //handle error
        res.json({success:false, message: error.message})
    }
    
}

export {clerkWebhooks}