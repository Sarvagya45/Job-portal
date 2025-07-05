import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('token');
        
        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorised, login again"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the company
        const company = await Company.findById(decoded.id);
        
        if (!company) {
            return res.json({
                success: false,
                message: "Not Authorised, login again"
            });
        }

        // Add company to request object
        req.company = company;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.json({
            success: false,
            message: "Not Authorised, login again"
        });
    }
};

export default authMiddleware;