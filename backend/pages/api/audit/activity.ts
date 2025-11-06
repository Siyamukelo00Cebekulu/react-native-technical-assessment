import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { db } = await connectToDatabase();

  try {
    const { limit = "100" } = req.query;

    const recentActivity = await db
      .collection("change_logs")
      .find({})
      .sort({ changedAt: -1 })
      .limit(parseInt(limit as string))
      .toArray();

    res.status(200).json({ activity: recentActivity });
  } catch (error) {
    console.error("Activity log error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
