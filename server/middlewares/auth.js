import jwt from 'jsonwebtoken'

// Middleware to check if the user is authenticated or not
const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers

        if(!token) {
            return res.json({success:false, message: "Not Authorized Login again"})
        }

        const token_decode = jwt.decode(token)
        req.body.clerkId = token_decode.clerkId
        next()
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    } 
}

export default authUser;

