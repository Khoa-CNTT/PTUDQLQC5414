import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') return res.status(403).json({ message: "Forbidden" });

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default adminAuth;
