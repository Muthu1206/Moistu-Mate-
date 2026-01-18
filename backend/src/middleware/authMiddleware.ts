import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "Not authorized" });
    const token = auth.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "JWT secret not configured" });
    const decoded = jwt.verify(token, secret) as JwtPayload;
    if (!decoded?.id) return res.status(401).json({ message: "Invalid token" });
    const user = await User.findById(decoded.id).select("-passwordHash").lean();
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized", error: (err as Error).message });
  }
};
