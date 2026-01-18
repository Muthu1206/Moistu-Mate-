import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

function signToken(userId: string) {
  const secret = process.env.JWT_SECRET || "devsecret";
  return jwt.sign({ id: userId }, secret, { expiresIn: "30d" });
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, preferredLanguage } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash, preferredLanguage });
    const token = signToken(user._id.toString());
    const out = { token, user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage, role: user.role } };
    return res.status(201).json(out);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user._id.toString());
    const out = { token, user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage, role: user.role } };
    return res.json(out);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const me = async (req: Request, res: Response) => {
  // `protect` middleware attaches `req.user`
  const anyReq = req as any;
  if (!anyReq.user) return res.status(401).json({ message: "Not authenticated" });
  return res.json({ user: anyReq.user });
};
