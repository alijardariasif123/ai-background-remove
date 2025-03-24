import { Webhook } from "svix"
import userModel from "../models/userModel.js"

const clerkWebhooks = async (req, res) => {
    try {
        //create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        
        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userdata = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                };

                await userModel.create(userdata);
                res.json({ success: true });
                break;
            }

            case "user.updated": {
                const userdata = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                };

                await userModel.findOneAndUpdate({ clerkId: data.id }, userdata);
                res.json({ success: true });
                break;
            }

            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({ success: true });
                break;
            }

            default:
                res.status(400).json({ success: false, message: "Unknown event type" });
        }
    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        res.status(400).json({ success: false, message: "Invalid webhook request" });
    }
};

export { clerkWebhooks };



// import { Webhook } from "svix";
// import userModel from "../models/userModel.js";

// const clerkWebhooks = async (req, res) => {
//     try {
//         // Payload को string में convert करो
//         const payload = req.body.toString();  

//         // Clerk headers को लो
//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         };

//         // Svix Webhook instance बनाओ
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//         const event = whook.verify(payload, headers); // Verify the Webhook

//         const { data, type } = event; // Event data को लो

//         switch (type) {
//             case "user.created": {
//                 const userdata = {
//                     clerkId: data.id,
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     photo: data.image_url
//                 };

//                 await userModel.create(userdata);
//                 res.json({ success: true });
//                 break;
//             }

//             case "user.updated": {
//                 const userdata = {
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     photo: data.image_url
//                 };

//                 await userModel.findOneAndUpdate({ clerkId: data.id }, userdata);
//                 res.json({ success: true });
//                 break;
//             }

//             case "user.deleted": {
//                 await userModel.findOneAndDelete({ clerkId: data.id });
//                 res.json({ success: true });
//                 break;
//             }

//             default:
//                 res.status(400).json({ success: false, message: "Unknown event type" });
//         }
//     } catch (error) {
//         console.error("❌ Webhook Error:", error.message);
//         res.status(400).json({ success: false, message: "Invalid webhook request" });
//     }
// };

// export { clerkWebhooks };
