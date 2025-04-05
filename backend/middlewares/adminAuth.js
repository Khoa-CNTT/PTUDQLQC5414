import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Not authorized Login" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not authorized Login" })

        }
        next()
    } catch (e) {
        console.error(err);
        res.json({ success: false, message: err.message })
    }
}

export default adminAuth;