// backend/pages/api/inventory/items/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;
  const { db } = await connectToDatabase();

  try {
    switch (req.method) {
      case "GET":
        const item = await db.collection("inventory_items").findOne({
          _id: new ObjectId(id as string),
          deleted: { $ne: true },
        });

        if (!item) {
          return res.status(404).json({ error: "Item not found" });
        }

        return res.status(200).json({ item });

      case "PUT":
        const updateData = {
          ...req.body,
          updatedAt: new Date(),
        };

        const result = await db
          .collection("inventory_items")
          .updateOne({ _id: new ObjectId(id as string) }, { $set: updateData });

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Item not found" });
        }

        const updatedItem = await db.collection("inventory_items").findOne({
          _id: new ObjectId(id as string),
        });

        return res.status(200).json({ item: updatedItem });

      case "DELETE":
        // Soft delete
        const deleteResult = await db
          .collection("inventory_items")
          .updateOne(
            { _id: new ObjectId(id as string) },
            { $set: { deleted: true, updatedAt: new Date() } }
          );

        if (deleteResult.matchedCount === 0) {
          return res.status(404).json({ error: "Item not found" });
        }

        return res.status(200).json({ message: "Item deleted successfully" });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
