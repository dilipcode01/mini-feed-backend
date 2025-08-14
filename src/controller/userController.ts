import { Request, Response } from "express";
import { ApiResponse } from "../types/response";
import { findUserByEmail } from "../services/userService";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mini-feed";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: "Email is required",
      } as ApiResponse);
      return;
    }

    const user = findUserByEmail(email);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found.",
      } as ApiResponse);
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      data: {
        user,
        token,
      },
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    } as ApiResponse);
  }
};
