import { Webhook } from "svix";
import userModel from "../models/userModel.js";

const clerkWebhooks = async (req, res) => {
    try {
        // Create a svix instance with Clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        
        const payload = req.body;
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        await whook.verify(payload, headers);

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userdata = {
                    clerkId: data.id,
                    email: data.email_addresses[0]?.email_address || "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || "",
                    creditBalance: 5
                };

                await userModel.create(userdata);
                res.json({ success: true });
                break;
            }

            case "user.updated": {
                const userdata = {
                    email: data.email_addresses[0]?.email_address || "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || ""
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
