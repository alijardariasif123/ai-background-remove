import { Webhook } from "svix"
import userModel from "../models/userModel.js"
//API controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    try {
        const payload = req.body;  // Express raw() इस्तेमाल करने के बाद body सही होगी
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Clerk Webhook को Verify करना
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(payload, headers);  // यहाँ Raw Payload यूज़ करें

        const { data, type } = JSON.parse(payload); // Raw JSON को Parse करें

        switch (type) {
            case "user.created": {
                const userdata = {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address || null,
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || ""
                };

                await userModel.create(userdata);
                res.json({ success: true });
                break;
            }

            case "user.updated": {
                const userdata = {
                    email: data.email_addresses?.[0]?.email_address || null,
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

export { clerkWebhooks }