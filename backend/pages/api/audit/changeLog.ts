import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

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
    const { itemId, limit = "50" } = req.query;

    let query: any = {};
    if (itemId) {
      query.itemId = new ObjectId(itemId as string);
    }

    const changeLogs = await db
      .collection("change_logs")
      .find(query)
      .sort({ changedAt: -1 })
      .limit(parseInt(limit as string))
      .toArray();

    res.status(200).json({ changeLogs });
  } catch (error) {
    console.error("Audit log error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
