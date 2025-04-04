
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gán vào req.user thay vì req.body
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Invalid Token' });
    }
};

export default authUser;
