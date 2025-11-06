import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectToDatabase();

    // Test database connection
    await db.command({ ping: 1 });

    // Get collection counts
    const itemsCount = await db.collection("inventory_items").countDocuments();
    const adjustmentsCount = await db
      .collection("inventory_adjustments")
      .countDocuments();

    res.status(200).json({
      status: "healthy",
      database: "connected",
      collections: {
        inventory_items: itemsCount,
        inventory_adjustments: adjustmentsCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
  }
}
