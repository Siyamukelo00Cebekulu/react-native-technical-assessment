import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { db } = await connectToDatabase();

  try {
    // For demo purposes, we'll use a simple user collection
    // You should use proper password hashing in production
    const user = await db.collection("users").findOne({
      email: email.toLowerCase(),
      password: password, // In production, use proper password hashing!
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return user info (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
      message: "Sign in successful",
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
