import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    const { db } = await connectToDatabase();

    const stats = {
      database: {
        name: db.databaseName,
        collections: await db.listCollections().toArray(),
      },
      counts: {
        users: await db.collection("users").countDocuments(),
        inventory_items: await db
          .collection("inventory_items")
          .countDocuments(),
        inventory_adjustments: await db
          .collection("inventory_adjustments")
          .countDocuments(),
      },
      lowStock: await db
        .collection("inventory_items")
        .find({ $expr: { $lte: ["$quantity", "$reorderThreshold"] } })
        .toArray(),
      recentAdjustments: await db
        .collection("inventory_adjustments")
        .find({})
        .sort({ adjustedAt: -1 })
        .limit(5)
        .toArray(),
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to get status" });
  }
}
