// Role-based access control middleware
export const requireRole = (role: string) => {
    return (req: any, res: any, next: any) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        next();
    };
};
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }
    
    try {
        const decoded = jwt.verify(
            token,
            'secret'
        );

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};